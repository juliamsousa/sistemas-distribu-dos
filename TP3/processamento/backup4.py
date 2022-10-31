import socket
import time

IP = "127.0.0.3"
PORT4 = 8084

def multiplicacao(conn):
    numbers = conn.recv(1024).decode("utf-8")
    result = int(numbers[0]) * int(numbers[1])
    print(f"{numbers[0]} * {numbers[1]} = {result}")

    conn.send(str(result).encode("utf-8"))


def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("Conectando ao servidor backup")

    try:
        server.bind((IP, PORT4))
        server.listen()
        print(f"Backup 4 listening na porta {PORT4}")
    except:
        return print("Problema de conexão. Não foi possível inicializar o Servidor 3!")

    conn, addr = server.accept()
    multiplicacao(conn)
    
    server.close()


if __name__ == "__main__":
    main()