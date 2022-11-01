import socket
import random
import time

IP = "127.0.0.2"
PORT1 = 8088
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
    except:
        print("Servidor primário indisponível")
    
    processamento(client)
    client.close()
    
if __name__ == "__main__":
    main()