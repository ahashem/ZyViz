const mockOrders = [
  {
    'userid': '69b8810c-12ef-4107-a282-03cddb46f1ad',
    'orderid': 1,
    'orderAmount': '$89.96',
    'orderdate': '2015-07-09T13:53:06+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch D',
    'deliveryArea': 'Al Bidae'
  },
  {
    'userid': 'f1d3caaf-be09-43d8-a7d9-5fa3ecb530fa',
    'orderid': 2,
    'orderAmount': '$36.51',
    'orderdate': '2014-07-24T14:33:52+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch D',
    'deliveryArea': 'Saad Al Abdullah'
  },
  {
    'userid': 'c94a020b-63d8-42bb-af31-4af88a52a383',
    'orderid': 3,
    'orderAmount': '$99.61',
    'orderdate': '2017-04-13T18:55:54+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch C',
    'deliveryArea': 'Qibla'
  },
  {
    'userid': 'f2cc211e-f835-4c87-b0e4-ef1b048f5d21',
    'orderid': 4,
    'orderAmount': '$20.85',
    'orderdate': '2017-09-30T01:37:22+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch A',
    'deliveryArea': 'Doha'
  },
  {
    'userid': '96877167-873b-4b49-aa5f-88cd59b56929',
    'orderid': 5,
    'orderAmount': '$83.02',
    'orderdate': '2015-12-16T23:19:31+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch F',
    'deliveryArea': 'Faiha'
  },
  {
    'userid': 'e1eeb0d3-4eef-48a1-9bf3-21a480223112',
    'orderid': 6,
    'orderAmount': '$74.36',
    'orderdate': '2014-06-26T08:03:06+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch E',
    'deliveryArea': 'Nuzha'
  },
  {
    'userid': '1f02b30c-6ab1-44ec-81be-572caab100e4',
    'orderid': 7,
    'orderAmount': '$34.84',
    'orderdate': '2017-01-01T09:24:30+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch D',
    'deliveryArea': 'Fahaheel'
  },
  {
    'userid': 'd55fa20a-7d00-4822-b6fa-f0f5ab1ec4ce',
    'orderid': 8,
    'orderAmount': '$91.43',
    'orderdate': '2017-05-31T10:53:02+00:00',
    'paymentMethod': 'KNET',
    'branch': 'Branch A',
    'deliveryArea': 'Al Qusour'
  },
  {
    'userid': '2e03c4eb-50fc-47a4-bf7f-547a55ddf278',
    'orderid': 9,
    'orderAmount': '$67.52',
    'orderdate': '2015-12-06T00:16:29+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch E',
    'deliveryArea': 'Abu Halifa'
  },
  {
    'userid': '6379f0a8-5f36-489b-b154-ac14360626cb',
    'orderid': 10,
    'orderAmount': '$30.51',
    'orderdate': '2017-10-24T09:33:48+00:00',
    'paymentMethod': 'KNET',
    'branch': 'Branch B',
    'deliveryArea': 'Qasser'
  },
  {
    'userid': '20d7304b-2eca-47e5-999c-b21b0af9e5b6',
    'orderid': 11,
    'orderAmount': '$83.43',
    'orderdate': '2017-02-01T17:39:54+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch B',
    'deliveryArea': 'Abdullah Al Salem'
  },
  {
    'userid': 'e17782e4-f4fb-4cf7-8ff5-89bd7e27df4c',
    'orderid': 12,
    'orderAmount': '$30.49',
    'orderdate': '2018-06-23T14:10:36+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch D',
    'deliveryArea': 'Qibla'
  },
  {
    'userid': 'b1689a89-3c1b-46e4-863d-e825a48b62cf',
    'orderid': 13,
    'orderAmount': '$7.64',
    'orderdate': '2018-06-02T01:20:40+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch B',
    'deliveryArea': 'Rabiya'
  },
  {
    'userid': '533de73c-053d-4c8d-b023-5a658ab387eb',
    'orderid': 14,
    'orderAmount': '$34.87',
    'orderdate': '2018-05-22T14:02:06+00:00',
    'paymentMethod': 'Cash',
    'branch': 'Branch F',
    'deliveryArea': 'Mirqab'
  },
  {
    'userid': '6a2edc6d-d74b-47b6-b554-f97c3ec5a391',
    'orderid': 15,
    'orderAmount': '$36.35',
    'orderdate': '2018-06-21T16:25:09+00:00',
    'paymentMethod': 'KNET',
    'branch': 'Branch F',
    'deliveryArea': 'Nahda'
  },
  {
    'userid': '5b317119-cda9-416f-923e-cb98ed5ea4a6',
    'orderid': 16,
    'orderAmount': '$32.93',
    'orderdate': '2016-02-24T13:05:42+00:00',
    'paymentMethod': 'KNET',
    'branch': 'Branch A',
    'deliveryArea': 'Reggai'
  },
  {
    'userid': '4f26a8e0-3199-4d08-b8bb-d0a5675e8972',
    'orderid': 17,
    'orderAmount': '$4.46',
    'orderdate': '2017-08-05T21:36:56+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch D',
    'deliveryArea': 'Jaber Al Ali'
  },
  {
    'userid': 'a3d2a038-21e1-40e3-8fe6-ef0c4a1a8d5a',
    'orderid': 18,
    'orderAmount': '$78.78',
    'orderdate': '2016-08-10T16:56:58+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch F',
    'deliveryArea': 'Zahra'
  },
  {
    'userid': 'f6b30b19-a30a-40ae-8013-39d7c3c7b3c4',
    'orderid': 19,
    'orderAmount': '$85.38',
    'orderdate': '2017-07-30T14:23:52+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch A',
    'deliveryArea': 'Hadiya'
  },
  {
    'userid': '9b7eb604-3fd4-4360-9ff2-d5641570aed1',
    'orderid': 1233,
    'orderAmount': '$92.92',
    'orderdate': '2016-09-17T14:33:59+00:00',
    'paymentMethod': 'KNET',
    'branch': 'Branch C',
    'deliveryArea': 'Rai'
  },
  {
    'userid': 'ef48052d-581f-4911-953c-156936200e14',
    'orderid': 1234,
    'orderAmount': '$45.30',
    'orderdate': '2017-08-31T08:55:50+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch F',
    'deliveryArea': 'Qortuba'
  },
  {
    'userid': '76fa01fd-d9ab-495e-afad-fa12b228413b',
    'orderid': 1235,
    'orderAmount': '$83.29',
    'orderdate': '2015-12-25T14:35:04+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch F',
    'deliveryArea': 'Rai'
  },
  {
    'userid': 'e0025bee-b63b-44e7-b286-366649161082',
    'orderid': 1236,
    'orderAmount': '$1.84',
    'orderdate': '2014-12-04T14:25:12+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch B',
    'deliveryArea': 'Abu Al Hasaniya'
  },
  {
    'userid': '840812f4-0d22-4680-9554-6242ca4dc22f',
    'orderid': 1237,
    'orderAmount': '$34.16',
    'orderdate': '2017-10-05T10:35:00+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch D',
    'deliveryArea': 'Zahra'
  },
  {
    'userid': '17929585-a2f5-43bf-807f-cc78c64ce8b3',
    'orderid': 1238,
    'orderAmount': '$57.89',
    'orderdate': '2015-05-04T01:54:51+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch C',
    'deliveryArea': 'Sheikh Saad Aviation Terminal'
  },
  {
    'userid': '0c4bf56f-25da-4081-8e5e-c07d61d22db4',
    'orderid': 1239,
    'orderAmount': '$14.34',
    'orderdate': '2016-02-10T09:29:28+00:00',
    'paymentMethod': 'KNET',
    'branch': 'Branch F',
    'deliveryArea': 'Reggai'
  },
  {
    'userid': 'cf0ad774-0096-464f-ac00-3cbe37578904',
    'orderid': 1240,
    'orderAmount': '$78.24',
    'orderdate': '2018-03-31T04:01:29+00:00',
    'paymentMethod': 'CreditCard',
    'branch': 'Branch E',
    'deliveryArea': 'Jaber Al Ahmad'
  },
];

export default mockOrders;
