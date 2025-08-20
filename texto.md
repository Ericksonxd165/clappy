  File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
db-1        | 2025-08-20 01:15:48.348 UTC [53] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     with self.db.wrap_database_errors:


backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
db-1        | 2025-08-20 01:15:48.349 UTC [53] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
db-1        | 2025-08-20 01:15:48.349 UTC [53] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:48.351 UTC [53] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
db-1        | 2025-08-20 01:15:48.351 UTC [53] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:48.353 UTC [53] ERROR:  relation "clap_caja" does not exist at character 92




db-1        | 2025-08-20 01:15:48.353 UTC [53] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...st at character 92
backend-1   |                                                              ^"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_ca
backend-1   | 2025-08-20 01:15:48.364 UTC [53] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | [20/Aug/2025 01:15:44] "GET /clap/cajas/ HTTP/1.1" 500 153170a"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_ca
backend-1   | Internal Server Error: /clap/cajas/ROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:48.365 UTC [53] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute

db-1        | 2025-08-20 01:15:48.367 UTC [53] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:48.367 UTC [53] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:52.208 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:52.208 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja"
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
db-1        | 2025-08-20 01:15:52.330 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |                                                              ^
db-1        | 2025-08-20 01:15:52.330 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | 
db-1        | 2025-08-20 01:15:52.333 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | 
db-1        | 2025-08-20 01:15:52.333 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:52.335 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | The above exception was the direct cause of the following exception:
db-1        | 2025-08-20 01:15:52.335 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | 
db-1        | 2025-08-20 01:15:52.336 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | Traceback (most recent call last):
db-1        | 2025-08-20 01:15:52.336 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner

db-1        | 2025-08-20 01:15:52.338 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     response = get_response(request)
db-1        | 2025-08-20 01:15:52.338 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:52.339 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
db-1        | 2025-08-20 01:15:52.339 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

db-1        | 2025-08-20 01:15:52.340 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:52.340 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:52.348 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:52.348 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
db-1        | 2025-08-20 01:15:52.513 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92


backend-1   |     return self.dispatch(request, *args, **kwargs)
db-1        | 2025-08-20 01:15:52.513 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:52.524 UTC [54] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:52.524 UTC [54] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     response = self.handle_exception(exc)
db-1        | 2025-08-20 01:15:52.940 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:52.940 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja"
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
db-1        | 2025-08-20 01:15:53.084 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     self.raise_uncaught_exception(exc)


db-1        | 2025-08-20 01:15:53.084 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_cabackend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc:15:53.087 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatchp_caja"."stock", "clap_caja"."date" FROM "clap_ca
db-1        | 2025-08-20 01:15:53.088 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     response = handler(request, *args, **kwargs)
db-1        | 2025-08-20 01:15:53.088 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:53.090 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
db-1        | 2025-08-20 01:15:53.090 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     return Response(serializer.data)
db-1        | 2025-08-20 01:15:53.094 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |                     ^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:53.094 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
db-1        | 2025-08-20 01:15:53.110 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     ret = super().data
db-1        | 2025-08-20 01:15:53.110 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |           ^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:53.126 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
db-1        | 2025-08-20 01:15:53.126 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     self._data = self.to_representation(self.instance)
db-1        | 2025-08-20 01:15:53.128 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:53.128 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21


db-1        | 2025-08-20 01:15:53.129 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation




db-1        | 2025-08-20 01:15:53.129 UTC [55] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     return [
backend-1   |            ^1:15:53.138 UTC [55] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__caja"."stock", "clap_caja"."date" FROM "clap_ca
backend-1   |     self._fetch_all()00 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92


db-1        | 2025-08-20 01:15:54.700 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja"
db-1        | 2025-08-20 01:15:54.804 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92etch_all
db-1        | 2025-08-20 01:15:54.804 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


db-1        | 2025-08-20 01:15:54.807 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
db-1        | 2025-08-20 01:15:54.807 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:54.811 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92


backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:54.811 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
db-1        | 2025-08-20 01:15:54.820 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:54.820 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:54.822 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92xecute
db-1        | 2025-08-20 01:15:54.822 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

db-1        | 2025-08-20 01:15:54.824 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
db-1        | 2025-08-20 01:15:54.824 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     return self._execute_with_wrappers(




db-1        | 2025-08-20 01:15:54.825 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92


backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers"clap_caja"."date" FROM "clap_ca
db-1        | 2025-08-20 01:15:54.827 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     return executor(sql, params, many, context)
db-1        | 2025-08-20 01:15:54.827 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:54.829 UTC [56] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute




db-1        | 2025-08-20 01:15:54.829 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__ 92
db-1        | 2025-08-20 01:15:54.837 UTC [56] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value


db-1        | 2025-08-20 01:15:55.274 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
db-1        | 2025-08-20 01:15:55.274 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja"
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
db-1        | 2025-08-20 01:15:55.425 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
db-1        | 2025-08-20 01:15:55.425 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
db-1        | 2025-08-20 01:15:55.427 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |                                                              ^
db-1        | 2025-08-20 01:15:55.427 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | 
db-1        | 2025-08-20 01:15:55.429 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | [20/Aug/2025 01:15:44] "GET /clap/cajas/ HTTP/1.1" 500 153170a"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_ca
backend-1   | [20/Aug/2025 01:15:46] "OPTIONS /users/api/v1/me/ HTTP/1.1" 200 0s not exist at character 92


backend-1   | [20/Aug/2025 01:15:46] "OPTIONS /users/api/v1/me/ HTTP/1.1" 200 0id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_ca

backend-1   | [20/Aug/2025 01:15:46] "GET /users/api/v1/me/ HTTP/1.1" 200 391
db-1        | 2025-08-20 01:15:55.442 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | [20/Aug/2025 01:15:46] "GET /users/api/v1/me/ HTTP/1.1" 200 391
db-1        | 2025-08-20 01:15:55.442 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | Internal Server Error: /clap/cajas/
db-1        | 2025-08-20 01:15:55.444 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   | Traceback (most recent call last):
db-1        | 2025-08-20 01:15:55.444 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
db-1        | 2025-08-20 01:15:55.445 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
backend-1   |     return self.cursor.execute(sql, params)

db-1        | 2025-08-20 01:15:55.445 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

db-1        | 2025-08-20 01:15:55.457 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92


backend-1   | psycopg2.errors.UndefinedTable: relation "clap_caja" does not exist
db-1        | 2025-08-20 01:15:55.457 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:55.458 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:55.458 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
db-1        | 2025-08-20 01:15:55.460 UTC [57] ERROR:  relation "clap_caja" does not exist at character 92
db-1        | 2025-08-20 01:15:55.460 UTC [57] STATEMENT:  SELECT "clap_caja"."id", "clap_caja"."price", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja" LIMIT 21
backend-1   | 
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner
backend-1   |     response = get_response(request)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/views/decorators/csrf.py", line 56, in wrapper_view
backend-1   |     return view_func(*args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
backend-1   |     return self.dispatch(request, *args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 515, in dispatch
backend-1   |     response = self.handle_exception(exc)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
backend-1   |     self.raise_uncaught_exception(exc)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatch
backend-1   |     response = handler(request, *args, **kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
backend-1   |     return Response(serializer.data)
backend-1   |                     ^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
backend-1   |     ret = super().data
backend-1   |           ^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
backend-1   |     self._data = self.to_representation(self.instance)
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation
backend-1   |     return [
backend-1   |            ^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__
backend-1   |     self._fetch_all()
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 1881, in _fetch_all
backend-1   |     self._result_cache = list(self._iterable_class(self))
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
backend-1   |     results = compiler.execute_sql(
backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
backend-1   |     cursor.execute(sql, params)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 102, in execute
backend-1   |     return super().execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
backend-1   |     return self._execute_with_wrappers(
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
backend-1   |     return executor(sql, params, many, context)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | [20/Aug/2025 01:15:48] "GET /clap/cajas/ HTTP/1.1" 500 153170
backend-1   | Internal Server Error: /clap/cajas/
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | psycopg2.errors.UndefinedTable: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | 
backend-1   | The above exception was the direct cause of the following exception:
backend-1   | 
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner
backend-1   |     response = get_response(request)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/views/decorators/csrf.py", line 56, in wrapper_view
backend-1   |     return view_func(*args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
backend-1   |     return self.dispatch(request, *args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 515, in dispatch
backend-1   |     response = self.handle_exception(exc)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
backend-1   |     self.raise_uncaught_exception(exc)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatch
backend-1   |     response = handler(request, *args, **kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
backend-1   |     return Response(serializer.data)
backend-1   |                     ^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
backend-1   |     ret = super().data
backend-1   |           ^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
backend-1   |     self._data = self.to_representation(self.instance)
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation
backend-1   |     return [
backend-1   |            ^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__
backend-1   |     self._fetch_all()
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 1881, in _fetch_all
backend-1   |     self._result_cache = list(self._iterable_class(self))
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
backend-1   |     results = compiler.execute_sql(
backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
backend-1   |     cursor.execute(sql, params)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 102, in execute
backend-1   |     return super().execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
backend-1   |     return self._execute_with_wrappers(
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
backend-1   |     return executor(sql, params, many, context)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | [20/Aug/2025 01:15:48] "GET /clap/cajas/ HTTP/1.1" 500 153170
backend-1   | Internal Server Error: /clap/cajas/
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | psycopg2.errors.UndefinedTable: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | 
backend-1   | The above exception was the direct cause of the following exception:
backend-1   | 
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner
backend-1   |     response = get_response(request)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/views/decorators/csrf.py", line 56, in wrapper_view
backend-1   |     return view_func(*args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
backend-1   |     return self.dispatch(request, *args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 515, in dispatch
backend-1   |     response = self.handle_exception(exc)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
backend-1   |     self.raise_uncaught_exception(exc)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatch
backend-1   |     response = handler(request, *args, **kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
backend-1   |     return Response(serializer.data)
backend-1   |                     ^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
backend-1   |     ret = super().data
backend-1   |           ^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
backend-1   |     self._data = self.to_representation(self.instance)
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation
backend-1   |     return [
backend-1   |            ^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__
backend-1   |     self._fetch_all()
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 1881, in _fetch_all
backend-1   |     self._result_cache = list(self._iterable_class(self))
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
backend-1   |     results = compiler.execute_sql(
backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
backend-1   |     cursor.execute(sql, params)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 102, in execute
backend-1   |     return super().execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
backend-1   |     return self._execute_with_wrappers(
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
backend-1   |     return executor(sql, params, many, context)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | [20/Aug/2025 01:15:52] "GET /clap/cajas/ HTTP/1.1" 500 153170
backend-1   | Internal Server Error: /clap/cajas/
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | psycopg2.errors.UndefinedTable: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | 
backend-1   | The above exception was the direct cause of the following exception:
backend-1   | 
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner
backend-1   |     response = get_response(request)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/views/decorators/csrf.py", line 56, in wrapper_view
backend-1   |     return view_func(*args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
backend-1   |     return self.dispatch(request, *args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 515, in dispatch
backend-1   |     response = self.handle_exception(exc)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
backend-1   |     self.raise_uncaught_exception(exc)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatch
backend-1   |     response = handler(request, *args, **kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
backend-1   |     return Response(serializer.data)
backend-1   |                     ^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
backend-1   |     ret = super().data
backend-1   |           ^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
backend-1   |     self._data = self.to_representation(self.instance)
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation
backend-1   |     return [
backend-1   |            ^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__
backend-1   |     self._fetch_all()
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 1881, in _fetch_all
backend-1   |     self._result_cache = list(self._iterable_class(self))
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
backend-1   |     results = compiler.execute_sql(
backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
backend-1   |     cursor.execute(sql, params)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 102, in execute
backend-1   |     return super().execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
backend-1   |     return self._execute_with_wrappers(
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
backend-1   |     return executor(sql, params, many, context)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | [20/Aug/2025 01:15:53] "GET /clap/cajas/ HTTP/1.1" 500 153170
backend-1   | Internal Server Error: /clap/cajas/
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | psycopg2.errors.UndefinedTable: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | 
backend-1   | The above exception was the direct cause of the following exception:
backend-1   | 
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner
backend-1   |     response = get_response(request)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/views/decorators/csrf.py", line 56, in wrapper_view
backend-1   |     return view_func(*args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
backend-1   |     return self.dispatch(request, *args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 515, in dispatch
backend-1   |     response = self.handle_exception(exc)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
backend-1   |     self.raise_uncaught_exception(exc)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatch
backend-1   |     response = handler(request, *args, **kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
backend-1   |     return Response(serializer.data)
backend-1   |                     ^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
backend-1   |     ret = super().data
backend-1   |           ^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
backend-1   |     self._data = self.to_representation(self.instance)
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation
backend-1   |     return [
backend-1   |            ^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__
backend-1   |     self._fetch_all()
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 1881, in _fetch_all
backend-1   |     self._result_cache = list(self._iterable_class(self))
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
backend-1   |     results = compiler.execute_sql(
backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
backend-1   |     cursor.execute(sql, params)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 102, in execute
backend-1   |     return super().execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
backend-1   |     return self._execute_with_wrappers(
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
backend-1   |     return executor(sql, params, many, context)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | [20/Aug/2025 01:15:55] "GET /clap/cajas/ HTTP/1.1" 500 153170
backend-1   | Internal Server Error: /clap/cajas/
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | psycopg2.errors.UndefinedTable: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | 
backend-1   | The above exception was the direct cause of the following exception:
backend-1   | 
backend-1   | Traceback (most recent call last):
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/exception.py", line 55, in inner
backend-1   |     response = get_response(request)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/core/handlers/base.py", line 197, in _get_response
backend-1   |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/views/decorators/csrf.py", line 56, in wrapper_view
backend-1   |     return view_func(*args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/viewsets.py", line 125, in view
backend-1   |     return self.dispatch(request, *args, **kwargs)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 515, in dispatch
backend-1   |     response = self.handle_exception(exc)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 475, in handle_exception
backend-1   |     self.raise_uncaught_exception(exc)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
backend-1   |     raise exc
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/views.py", line 512, in dispatch
backend-1   |     response = handler(request, *args, **kwargs)
backend-1   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/mixins.py", line 46, in list
backend-1   |     return Response(serializer.data)
backend-1   |                     ^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 797, in data
backend-1   |     ret = super().data
backend-1   |           ^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 251, in data
backend-1   |     self._data = self.to_representation(self.instance)
backend-1   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/rest_framework/serializers.py", line 715, in to_representation
backend-1   |     return [
backend-1   |            ^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 398, in __iter__
backend-1   |     self._fetch_all()
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 1881, in _fetch_all
backend-1   |     self._result_cache = list(self._iterable_class(self))
backend-1   |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/query.py", line 91, in __iter__
backend-1   |     results = compiler.execute_sql(
backend-1   |               ^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/models/sql/compiler.py", line 1562, in execute_sql
backend-1   |     cursor.execute(sql, params)
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 102, in execute
backend-1   |     return super().execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 67, in execute
backend-1   |     return self._execute_with_wrappers(
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
backend-1   |     return executor(sql, params, many, context)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 84, in _execute
backend-1   |     with self.db.wrap_database_errors:
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/utils.py", line 91, in __exit__
backend-1   |     raise dj_exc_value.with_traceback(traceback) from exc_value
backend-1   |   File "/usr/local/lib/python3.11/site-packages/django/db/backends/utils.py", line 89, in _execute
backend-1   |     return self.cursor.execute(sql, params)
backend-1   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
backend-1   | django.db.utils.ProgrammingError: relation "clap_caja" does not exist
backend-1   | LINE 1: ...ce", "clap_caja"."stock", "clap_caja"."date" FROM "clap_caja...
backend-1   |                                                              ^
backend-1   | 
backend-1   | [20/Aug/2025 01:15:55] "GET /clap/cajas/ HTTP/1.1" 500 153170