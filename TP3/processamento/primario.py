import socket
import time

IP = "127.0.0.1"
PORT1 = 8081
PORT2 = 8082
PORT3 = 8083
PORT4 = 8084

def isConnection(conn):
    # Checando se o cliente está online
    isConnected = "connected?"
    conn.send(isConnected.encode("utf-8"))
    isConnected = conn.recv(1024).decode("utf-8") 

    if isConnected == "Online":
        return True
    else:
        return False

def multiplicacaoBackup(client,numbers):
    client.send(numbers.encode("utf-8"))
    time.sleep(0.2)
    return int(client.recv(1024).decode("utf-8"))

def multiplicacao(numbers):
    return int(numbers[0]) * int(numbers[1])

#Para ser válido o acordo, é necessário 2k+1 (sendo k número de erros) esteja funcionando corretamente para 3k+1 sistemas.
def acordoBizantino(result1,result2,result3,result4):
    if result1 == result2 == result3 == result4:
        if (result1 and result2 and result3 and result4) >= 0:
            print("De acordo com Bizantino")
    elif result1 == result2 == result3: 
        if (result1 and result2 and result3) >= 0:
            print("De acordo com Bizantino")
    elif result2 == result3 == result4: 
        if (result2 and result3 and result4) >= 0:
            print("De acordo com Bizantino")
    elif result1 == result3 == result4: 
        if (result1 and result3 and result4) >= 0:
            print("De acordo com Bizantino")
    elif result1 == result2 == result4: 
        if (result1 and result2 and result4) >= 0:
            print("De acordo com Bizantino")
    else:
        print("Não de acordo com Bizantino")

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("Conectando ao servidor primário")

    try:
        server.bind((IP, PORT1))
        server.listen()
        print(f"Servidor primário na porta {PORT1}")
    except:
        return print("Problema de conexão. Não foi possível inicializar o Servidor Primário!")

    conn, addr = server.accept()

    #Verifica se o cliente está online antes de iniciar
    if isConnection(conn):
        numbers = conn.recv(1024).decode("utf-8")
        resultPrimary = multiplicacao(numbers)
        # conectando com backup
        backup1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        backup2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        backup3 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:        
            backup1.connect((IP, PORT2))
            result1 = multiplicacaoBackup(backup1,numbers)
        except:
            result1 = -1
            print("Não foi possível conectar com o BACKUP 1")
        try:        
            backup2.connect((IP, PORT3))
            result2 = multiplicacaoBackup(backup2,numbers)
        except:
            result2 = -1
            print("Não foi possível conectar com o BACKUP 2")
        try:        
            backup3.connect((IP, PORT4))
            result3 = multiplicacaoBackup(backup3,numbers)
        except:
            result3 = -1
            print("Não foi possível conectar com o BACKUP 3")
        #----------------------------------------------------#

        acordoBizantino(result1,result2,result3,resultPrimary)
    conn.close()

if __name__ == "__main__":
    main()