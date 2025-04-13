document.getElementById('iniciar').addEventListener('click', function() {
    const tempoPreparacao = parseInt(document.getElementById('preparacao').value) || 0;
    const tempoExercicio = parseInt(document.getElementById('exercicio').value) || 0;
    const tempoDescanso = parseInt(document.getElementById('descanso').value) || 0;
    const numeroRepeticoes = parseInt(document.getElementById('repeticoes').value) || 1;

    let mensagem = document.getElementById('mensagem');
    let temporizador = document.getElementById('temporizador');

    let fase = 0; // 0: Preparação, 1: Exercício, 2: Descanso
    let tempoRestante = tempoPreparacao; // Começa com o tempo de preparação
    let repeticoesRestantes = numeroRepeticoes; // Contador de repetições

    mensagem.innerText = "Preparando...";
    temporizador.innerText = formatarTempo(tempoRestante);

    // Toca o som de preparação
    document.getElementById('audioPreparacao').play();

    let intervalo = setInterval(() => {
        tempoRestante--;

        temporizador.innerText = formatarTempo(tempoRestante);

        if (tempoRestante <= 0) {
            fase++;
            if (fase === 1) {
                // Fase de Exercício
                tempoRestante = tempoExercicio;
                mensagem.innerText = "Exercício em andamento!";
                document.getElementById('audioPreparacao').pause();
                document.getElementById('audioPreparacao').currentTime = 0; // Reinicia o áudio
                const exercicioAudio = new Audio('start.mp3');
                exercicioAudio.play();
            } else if (fase === 2) {
                // Fase de Descanso
                tempoRestante = tempoDescanso;
                mensagem.innerText = "Descanso!";
                document.getElementById('audioDescanso').play();
            } else {
                // Fim de uma repetição
                repeticoesRestantes--;
                if (repeticoesRestantes > 0) {
                    fase = 0; // Reinicia para a fase de preparação
                    tempoRestante = tempoPreparacao; // Reinicia o tempo de preparação
                    mensagem.innerText = "Preparando...";
                    document.getElementById('audioPreparacao').play();
                } else {                    // Fim do treino
                    clearInterval(intervalo);
                    document.getElementById('audioDescanso').pause();
                    document.getElementById('audioDescanso').currentTime = 0; // Reinicia o áudio
                    mensagem.innerText = "Treino concluído!";
                    temporizador.innerText = "00:00";
                    return; // Sai da função
                }
            }
        }
    }, 1000); // Atualiza a cada segundo
});

// Função para formatar o tempo em minutos e segundos
function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${minutos < 10 ? '0' : ''}${minutos}:${seg < 10 ? '0' : ''}${seg}`;
}