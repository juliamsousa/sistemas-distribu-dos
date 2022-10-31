import socket
import random

IP = "127.0.0.3"
PORT1 = 8081
PORT2 = 8082
PORT3 = 8083
PORT4 = 8084

def statusCLient(client):
    # Confirmando para o server que estou online
        try:
            confirm_client = client.recv(1024).decode("utf-8")
        except:
            print("[ERROR 00] Can't connect with server")
            print("[RECONNECTING] Trying again")
        
        if confirm_client == "connected?":        
            confirm_client = "Online"
            try:
                client.send(confirm_client.encode("utf-8"))
            except:
                print("[ERROR 01] Can't connect with server")

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
    processamento(client)
    
if __name__ == "__main__":
    main()