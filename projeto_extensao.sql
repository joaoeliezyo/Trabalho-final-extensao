-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS projetos_extensao;
USE projetos_extensao;

-- Tabela Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Tipo_Pessoa
CREATE TABLE IF NOT EXISTS Tipo_Pessoa (
    id_tipo_pessoa INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50)
);

-- Tabela Pessoa
CREATE TABLE IF NOT EXISTS Pessoa (
    id_pessoa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    cpf VARCHAR(20),
    email VARCHAR(100),
    telefone VARCHAR(20),
    id_tipo_pessoa INT,
    FOREIGN KEY (id_tipo_pessoa) REFERENCES Tipo_Pessoa(id_tipo_pessoa)
);

-- Tabela Tipo_Plano
CREATE TABLE IF NOT EXISTS Tipo_Plano (
    id_tipo_plano INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50)
);

-- Tabela Publico_Alvo
CREATE TABLE IF NOT EXISTS Publico_Alvo (
    id_publico_alvo INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50)
);

-- Tabela Projeto_Extensao
CREATE TABLE IF NOT EXISTS Projeto_Extensao (
    id_projeto INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    id_tipo_plano INT,
    coordenador_id INT,
    periodo_inicio DATE,
    periodo_fim DATE,
    carga_horaria_total INT,
    id_publico_alvo INT,
    objetivo TEXT,
    metodologia TEXT,
    FOREIGN KEY (coordenador_id) REFERENCES Pessoa(id_pessoa),
    FOREIGN KEY (id_tipo_plano) REFERENCES Tipo_Plano(id_tipo_plano),
    FOREIGN KEY (id_publico_alvo) REFERENCES Publico_Alvo(id_publico_alvo)
);

-- Tabela Papel_Projeto
CREATE TABLE IF NOT EXISTS Papel_Projeto (
    id_papel INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50)
);

-- Tabela Projeto_Pessoa
CREATE TABLE IF NOT EXISTS Projeto_Pessoa (
    id_projeto INT,
    id_pessoa INT,
    id_papel INT,
    PRIMARY KEY (id_projeto, id_pessoa),
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id_pessoa),
    FOREIGN KEY (id_papel) REFERENCES Papel_Projeto(id_papel)
);

-- Tabela Linha_Programatica
CREATE TABLE IF NOT EXISTS Linha_Programatica (
    id_linha INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela Projeto_LinhaProgramatica
CREATE TABLE IF NOT EXISTS Projeto_LinhaProgramatica (
    id_projeto INT,
    id_linha INT,
    PRIMARY KEY (id_projeto, id_linha),
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_linha) REFERENCES Linha_Programatica(id_linha)
);

-- Tabela Tipo_Acao
CREATE TABLE IF NOT EXISTS Tipo_Acao (
    id_acao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela Projeto_TipoAcao
CREATE TABLE IF NOT EXISTS Projeto_TipoAcao (
    id_projeto INT,
    id_acao INT,
    PRIMARY KEY (id_projeto, id_acao),
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_acao) REFERENCES Tipo_Acao(id_acao)
);

-- Tabela Tipo_Instituicao
CREATE TABLE IF NOT EXISTS Tipo_Instituicao (
    id_tipo_instituicao INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(20)
);

-- Tabela Instituicao
CREATE TABLE IF NOT EXISTS Instituicao (
    id_instituicao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    sigla VARCHAR(20),
    id_tipo_instituicao INT,
    FOREIGN KEY (id_tipo_instituicao) REFERENCES Tipo_Instituicao(id_tipo_instituicao)
);

-- Tabela Projeto_Instituicao
CREATE TABLE IF NOT EXISTS Projeto_Instituicao (
    id_projeto INT,
    id_instituicao INT,
    PRIMARY KEY (id_projeto, id_instituicao),
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_instituicao) REFERENCES Instituicao(id_instituicao)
);

-- Tabela Curso
CREATE TABLE IF NOT EXISTS Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nome_curso VARCHAR(255)
);

-- Tabela Projeto_Curso
CREATE TABLE IF NOT EXISTS Projeto_Curso (
    id_projeto INT,
    id_curso INT,
    PRIMARY KEY (id_projeto, id_curso),
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso)
);

-- Tabela Local_Execucao
CREATE TABLE IF NOT EXISTS Local_Execucao (
    id_local INT AUTO_INCREMENT PRIMARY KEY,
    endereco TEXT,
    cep VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100)
);

-- Tabela Projeto_Local
CREATE TABLE IF NOT EXISTS Projeto_Local (
    id_projeto INT,
    id_local INT,
    PRIMARY KEY (id_projeto, id_local),
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_local) REFERENCES Local_Execucao(id_local)
);

-- Tabela Avaliacao_Institucional
CREATE TABLE IF NOT EXISTS Avaliacao_Institucional (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_projeto INT NOT NULL,
    criterios_avaliacao TEXT,
    metodologia_avaliacao TEXT,
    forma_apresentacao_relatorio TEXT,
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto)
);

-- Tabela Faixa_Etaria
CREATE TABLE IF NOT EXISTS Faixa_Etaria (
    id_faixa INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50)
);

-- Tabela Escolaridade
CREATE TABLE IF NOT EXISTS Escolaridade (
    id_escolaridade INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50)
);

-- Tabela Avaliacao_Participante
CREATE TABLE IF NOT EXISTS Avaliacao_Participante (
    id_avaliacao_participante INT AUTO_INCREMENT PRIMARY KEY,
    id_projeto INT NOT NULL,
    data_resposta DATE,
    id_faixa INT,
    id_escolaridade INT,
    reside_na_comunidade BOOLEAN,
    avaliacao_conteudo VARCHAR(20),
    atendeu_expectativas VARCHAR(20),
    facilitadores_acessiveis VARCHAR(20),
    escuta_comunidade VARCHAR(20),
    estrutura_adequada VARCHAR(20),
    sente_mais_capacitado VARCHAR(20),
    contribuicao_pessoal VARCHAR(20),
    descricao_contribuicao TEXT,
    pretende_aplicar VARCHAR(20),
    motivo_nao_aplicar TEXT,
    recomendaria VARCHAR(20),
    comentario_positivo TEXT,
    sugestao_melhoria TEXT,
    sugestoes_futuras TEXT,
    consentimento BOOLEAN,
    assentimento BOOLEAN,
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto),
    FOREIGN KEY (id_faixa) REFERENCES Faixa_Etaria(id_faixa),
    FOREIGN KEY (id_escolaridade) REFERENCES Escolaridade(id_escolaridade)
);

-- Tabela projeto_custo
CREATE TABLE IF NOT EXISTS projeto_custo (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    id_projeto INT,
    descricao VARCHAR(255),
    quantitativo DECIMAL(10,2),
    valor_unitario DECIMAL(10,2),
    justificativa TEXT,
    realizado INT,
    tipo INT,
    FOREIGN KEY (id_projeto) REFERENCES Projeto_Extensao(id_projeto)
);
-- Povoando a base das tabelas auxiliares
-- INSERÇÕES NAS TABELAS AUXILIARES

-- Tipo_Pessoa
INSERT INTO Tipo_Pessoa (descricao) VALUES
('Coordenador'),
('Professor'),
('Técnico');

-- Tipo_Plano
INSERT INTO Tipo_Plano (descricao) VALUES
('Curricular'),
('Extracurricular');

-- Publico_Alvo
INSERT INTO Publico_Alvo (descricao) VALUES
('Interno'),
('Externo'),
('Ambos');

-- Papel_Projeto
INSERT INTO Papel_Projeto (descricao) VALUES
('Professor'),
('Técnico');

-- Linha_Programatica
INSERT INTO Linha_Programatica (nome) VALUES
('Comunicação'),
('Cultura'),
('Direitos Humanos e Justiça'),
('Educação'),
('Meio Ambiente'),
('Saúde'),
('Tecnologia e Produção'),
('Trabalho');

-- Tipo_Acao
INSERT INTO Tipo_Acao (nome) VALUES
('Programa'),
('Projeto'),
('Curso'),
('Evento'),
('Prestação de Serviço'),
('Produção e Publicação'),
('Incubadora'),
('Empresa Júnior'),
('Observatório'),
('Clínica Escola / Escritório Modelo'),
('Laboratório de Práticas Extensionistas');

-- Tipo_Instituicao
INSERT INTO Tipo_Instituicao (descricao) VALUES
('Pública'),
('Privada');

-- Faixa_Etaria
INSERT INTO Faixa_Etaria (descricao) VALUES
('Menos de 18'),
('18 a 24'),
('25 a 34'),
('35 a 44'),
('45 a 59'),
('60 ou mais');

-- Escolaridade
INSERT INTO Escolaridade (descricao) VALUES
('Não alfabetizado'),
('Ensino Fundamental'),
('Ensino Médio'),
('Superior'),
('Pós-graduação');

use projetos_extensao;
INSERT INTO projetos_extensao.Curso (nome_curso) VALUES
('REDES DE COMPUTADORES'),
('SISTEMAS PARA INTERNET'),
('TÉCNICO EM INFORMÁTICA'),
('TÉCNICO EM ADMINISTRAÇÃO'),
('TÉCNICO EM ENFERMAGEM'),
('GESTÃO DE RECURSOS HUMANOS'),
('GESTÃO FINANCEIRA'),
('BANCO DE DADOS'),
('BIOMEDICINA'),
('ENFERMAGEM'),
('ENGENHARIA DE ALIMENTOS'),
('FARMÁCIA'),
('ESPECIALIZAÇÃO EM DOCÊNCIA DO ENSINO SUPERIOR'),
('ESPECIALIZAÇÃO EM REDES DE COMPUTADORES COM ÊNFASE EM SOFTWARE LIVRE'),
('NIVELAMENTO PORTUGUÊS E MATEMÁTICA'),
('DIREITO'),
('SERVIÇO SOCIAL'),
('NIVELAMENTO ACADÊMICO EAD'),
('LICENCIATURA EM QUÍMICA'),
('LICENCIATURA EM MATEMÁTICA'),
('LICENCIATURA EM  PEDAGOGIA'),
('LICENCIATURA EM LETRAS PORTUGUÊS'),
('LICENCIATURA EM LETRAS INGLÊS'),
('LICENCIATURA EM LETRAS ESPANHOL'),
('BACHARELADO EM ADMINISTRAÇÃO'),
('BACHARELADO EM CIÊNCIAS CONTÁBEIS'),
('LICENCIATURA EM CIÊNCIAS BIOLÓGICAS'),
('LICENCIATURA EM FÍSICA'),
('LICENCIATURA EM COMPUTAÇÃO E INFORMÁTICA'),
('MEDICINA'),
('PRODUÇÃO DE SCORMS - EAD'),
('ESPECIALIZAÇÃO EM TERAPIA INTENSIVA'),
('ESPECIALIZAÇÃO EM BANCO DE DADOS'),
('ESPECIALIZAÇÃO EM TÉCNICA PARA PREGOEIRO'),
('ESPECIALIZAÇÃO EM FARMÁCIA HOSPITALAR E FARMACOTERAPIA'),
('GESTÃO DA TECNOLOGIA DA INFORMAÇÃO'),
('SISTEMAS BIOMÉDICOS'),
('DESIGN GRÁFICO'),
('PRODUÇÃO MULTIMÍDIA'),
('JOGOS DIGITAIS'),
('ESPECIALIZAÇÃO EM SEGURANÇA EM REDES COM ÊNFASE EM COMPUTAÇÃO FORENSE'),
('PILOTAGEM PROFISSIONAL DE AERONAVES'),
('ESPECIALIZAÇÃO EM  ELABORAÇÃO DE PROJETOS SOCIAIS E CAPTAÇÃO DE RECURSOS'),
('REFORÇO ACADÊMCIO DIREITO'),
('ESPECIALIZAÇÃO EM HEMATOLOGIA CLÍNICA E IMUNOHEMATOLOGIA LABORATORIAL'),
('ESPECIALIZAÇÃO EM DIREITO ELEITORAL E PROCESSO ELEITORAL COM ÊNFASE EM DOCÊNCIA DO ENSINO SUPERIOR'),
('ESPECIALIZAÇÃO EM HOME CARE'),
('ESPECIALIZAÇÃO EM DIREITO PENAL E PROCESSUAL PENAL COM ÊNFASE EM DOCÊNCIA DO ENSINO SUPERIOR'),
('ESPECIALIZAÇÃO EM PERÍCIA JUDICIAL E AUDITORIA CONTÁBIL'),
('NIVELAMENTO ACADÊMICO'),
('ODONTOLOGIA'),
('REFORÇO ACADÊMICO MEDICINA'),
('ESPECIALIZAÇÃO EM DIREITO PREVIDENCIÁRIO E PRÁTICA PREVIDENCIÁRIA'),
('ENGENHARIA DE COMPUTAÇÃO COM INTELIGÊNCIA ARTIFICIAL'),
('ESPECIALIZAÇÃO EM REGULARIZAÇÃO FUNDIÁRIA URBANA E RURAL'),
('ESPECIALIZAÇÃO EM DIREITO MÉDICO E DA SAÚDE'),
('ESPECIALIZAÇÃO EM DIREITO DIGITAL E ATUALIDADES'),
('ESPECIALIZAÇÃO PROFISSIONAL EM SAÚDE PÚBLICA'),
('ESPECIALIZAÇÃO EM ESTÉTICA E SAÚDE'),
('ESPECIALIZAÇÃO EM TRIBUNAL DO JÚRI'),
('ESPECIALIZAÇÃO EM URGÊNCIA E EMERGÊNCIA'),
('ESPECIALIZAÇÃO EM FARMÁCIA HOSPITALAR COM ÊNFASE EM CLÍNICA'),
('ESPECIALIZAÇÃO EM ANÁLISES CLÍNICAS E TOXICOLÓGICAS'),
('ESPECIALIZAÇÃO EM CENTRO CIRÚRGICO, RECUPERAÇÃO ANESTÉSICA E CENTRO DE MATERIAL E ESTERILIZAÇÃO'),
('ESPECIALIZAÇÃO EM GESTÃO HOSPITALAR'),
('ESPECIALIZAÇÃO EM CARDIOLOGIA'),
('ESPECIALIZAÇÃO EM DIREITO ADMINISTRATIVO');
