DROP STREAM riderSales;

CREATE STREAM riderSales (salesId VARCHAR, price DOUBLE, amount DOUBLE, store VARCHAR, product VARCHAR)
  WITH (kafka_topic='sales', key='salesId', value_format='json', partitions=1);



INSERT INTO riderSales (salesId, price, amount, store, product) VALUES ('c2309eec', 37.78, 10, '1', 'x burguer');
INSERT INTO riderSales (salesId, price, amount, store, product) VALUES ('c2309e123', 100.12, 1, '1', 'picanha suprema');
INSERT INTO riderSales (salesId, price, amount, store, product) VALUES ('c2309eec', 37.78, 10, '2', 'x burguer');
