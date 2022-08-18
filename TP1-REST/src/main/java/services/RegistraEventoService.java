package services;
import org.springframework.stereotype.Service;
import org.springframework.kafka.core.KafkaTemplate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistraEventoService {
    private final KafkaTemplate<Object, Object> template;

    public <T> void adicionarEvento(String topico, T dados){
        template.send(topico, dados);
    }
}
