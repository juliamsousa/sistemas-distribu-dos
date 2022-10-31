import socket
import random
from sqlite3 import connect

IP = "127.0.0.1"
PORT1 = 8081
PORT2 = 8082
PORT3 = 8083
PORT4 = 8084

def statusCLient(client):
    # Confirmando para o server que estou online
        try:
            confirm_client = client.recv(1024).decode("utf-8")
        except:
            print("Não é possível conectar com o servidor")
        
        if confirm_client == "connected?":        
            confirm_client = "Online"
            try:
                client.send(confirm_client.encode("utf-8"))
            except:
                print("Não é possível conectar com o servidor")

def processamento(client):
    statusCLient(client)

    x = random.randint(0, 9)
    y = random.randint(0 ,9)
    numbers = str(x) + str(y)

    # envia uma mensagem ao servidor
    client.send(numbers.encode("utf-8"))


def main():
    #AF_INET = IPV4 && SOCK_STREAM = TCP
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        client.connect((IP, PORT1))
        print("Conectado ao servidor primário")
        mensage = "1"
    except:
        client.connect((IP, PORT2))
        print("Conectado ao servidor secundário")
        mensage = "2"

    # envia uma mensagem ao servidor
    client.send(mensage.encode("utf-8"))
    
    #Criar menu infinito
    menuTrue = True
    while menuTrue:
        entrada = input("Escolha uma das opções: \n1) Processamento \n2)Armazenamento \n3)Encerrar")
        if int(entrada) == 1:
            processamento(client)
        elif int(entrada) == 2:
            print("criar armazenamento")
        elif int(entrada) == 3:
            menuTrue = False
            client.close

    
if __name__ == "__main__":
    main()