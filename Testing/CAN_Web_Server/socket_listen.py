import socket

HOST = '192.168.1.177'  # The server's hostname or IP address
PORT = 9001        # The port used by the server


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b'0')
    count =0 
    while True:
    
        try:
            data = s.recv(1024)
            if not data:
                break
            print (data.decode(), 'EOF')
            count+=1
            if count == 110:
                s.close() 
                break
        except KeyboardInterrupt:
            s.close()
            break
print("Done")      
       

# 0          639     10551543 18F0010B 1 8 CF FF F0 FF FF DC FF FF

    