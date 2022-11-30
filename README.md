# Project. SEASON

model 파일 생성

in "/backend"

npm i sequelize-auto@0.8.3 -g

sequelize-auto -o "./src/sequelize/models" -d "db_name" -h "db_host" -u "db_user" -p "db_port" -x "db_password" -e "db_type" --noAlias --noInitModels

ex)
sequelize-auto -o "./src/sequelize/models" -d season_dev -h season-dev.couxzb3vc1z3.ap-northeast-2.rds.amazonaws.com -u Mapsea -p 3306 -x '100521mapsea$$$' -e mariadb --noAlias --noInitModels


!! DB table 연관관계가 바뀌었을 경우
    --noInitModels을 제거해주면 init파일을 새로 생성할 수 있다. 그렇지만 새로 생성된 init파일에서 as값이 설정되어 접근시 alias로 접근해야 하기 때문에 alias를 모두 제거해야한다.
    --noInitModels을 제거하지 않고 init파일에 직접 연관관계를 만들어주어도 된다 !!