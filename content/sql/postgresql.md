---
title: "postgresql"
metaTitle: "postgresql"
metaDescription: "postgresql"
---
### postgresql 备份还原
```
//备份

/usr/pgsql-9.6/bin/pg_dump --file "${to_store_backup_path_and_filename}" --host "172.21.138.30" --port "5432" --username "postgres" --verbose --role "postgres" --format=c --blobs --section=pre-data --section=data --section=post-data "${backup_database_name}"

eg:
/usr/pgsql-9.6/bin/pg_dump --file "/DATA/backup/ORION_SYF_20190124.backup" --host "172.21.138.30" --port "5432" --username "postgres" --verbose --role "postgres" --format=c --blobs --section=pre-data --section=data --section=post-data "ORION_SYF"
                      
//还原

/usr/pgsql-9.6/bin/pg_restore --host "172.21.138.30" --port "5432" --username "postgres" -W --role "postgres" --dbname "${to_restore_name}" --verbose "${to_restore_path_and_dbname}"

eg:

/usr/pgsql-9.6/bin/pg_restore --host "172.21.138.30" --port "5432" --username "postgres" -W --role "postgres" --dbname "ORION_SYF_BAK" --verbose "/DATA/backup/ORION_SYF_20190124.backup"


在windows下postgresql 安装路径可能在 C:\PostgreSQL\pg10\bin 下
```

### 备份时 排除某张表
```
备份脚本上加上
--exclude-table ${logs_table}

eg:
--exclude-table public.core_api_log
```