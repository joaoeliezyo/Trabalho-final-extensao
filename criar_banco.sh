#!/bin/bash
# Script para criar o banco de dados do projeto de extensão

echo "Criando banco de dados projetos_extensao..."
mysql -h 127.0.0.1 -u eli -p SOUFE68498whrew < projeto_extensao.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Banco de dados criado com sucesso!"
else
    echo ""
    echo "✗ Erro ao criar banco de dados"
    echo "Verifique:"
    echo "- Se MySQL está rodando"
    echo "- Se as credenciais estão corretas"
    echo "- Se o arquivo projeto_extensao.sql está no diretório"
fi
