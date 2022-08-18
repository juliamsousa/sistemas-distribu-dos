package service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.PedidoData;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SalvarPedidoService {
    @KafkaListener(topics="SalvarPedido", groupId="MicroServicoSalvaPedido")
    private void executar(ConsumerRecord<String, String> record) {
        log.info("Key={}", record.key());
        log.info("Cabecalho={}", record.headers());
        log.info("Particao={}", record.partition());

        String strDados = record.value();
        ObjectMapper mapper = new ObjectMapper();
        PedidoData pedido = null;

        try {
            pedido = mapper.readValue(strDados, PedidoData.class);
        } catch (JsonProcessingException ex) {
            log.error("Falha ao converter evento [dado={}}]", strDados, ex);
            return;
        }

        log.info("Evento recebido = {}", pedido);

        // TODO: gravar no banco de dados
        // TODO: responder para a fila que o pedido foi salvo
    }

    private void gravar() {
        // TODO: gravar no banco de dados
    }
}
