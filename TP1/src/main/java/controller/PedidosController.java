package controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PedidosController {
    public ResponseEntity<String> SalvarPedido() {
        return ResponseEntity.ok("Sucesso");
    }
}
