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

def acordoBizantino():
    print("test")   

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

    nameServidor = conn.recv(1024).decode("utf-8")
    print(nameServidor + " o servidor primário")

    #Verifica se o cliente está online antes de iniciar
    if isConnection(conn):
        numbers = conn.recv(1024).decode("utf-8")
        resultPrimary = multiplicacao(numbers)
        print(resultPrimary)
        # conectando com backup
        backup1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        backup2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        backup3 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:        
            backup1.connect((IP, PORT2))
        except:
            print("Não foi possível conectar com o BACKUP 1")
        try:        
            backup2.connect((IP, PORT3))
        except:
            print("Não foi possível conectar com o BACKUP 2")
        try:        
            backup3.connect((IP, PORT4))
        except:
            print("Não foi possível conectar com o BACKUP 3")
        #----------------------------------------------------#
        result2 = multiplicacaoBackup(backup2,numbers)
        result3 = multiplicacaoBackup(backup3,numbers)
        print(str(result2) + " - " + str(result3) + " - " + str(resultPrimary))

    conn.close()

if __name__ == "__main__":
    main()