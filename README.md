# project-management-assignment-5

#### Performance Test before Indexing: 
- `db.orders.find({ order_id: 'fa50974b-0eff-48e8-b48a-acb4645a2bdc' }).explain("executionStats")`
- `db.orders.find({ customer_id: '68093a71a723ce53da043a3f' }).explain("executionStats")`

<img width="435" alt="Screenshot 2025-04-24 at 00 09 00" src="https://github.com/user-attachments/assets/3af35f44-6731-41f5-a2cd-d5b6cee8007b" />
<img width="340" alt="Screenshot 2025-04-24 at 00 13 17" src="https://github.com/user-attachments/assets/dd2b8b19-0cd9-43eb-a2f5-d9bccf63b80e" />

#### Indexing order_id:

<img width="346" alt="Screenshot 2025-04-24 at 00 10 18" src="https://github.com/user-attachments/assets/17af390e-5faa-460a-8145-62501e55e357" />
<img width="359" alt="Screenshot 2025-04-24 at 00 14 06" src="https://github.com/user-attachments/assets/1ea3fe6e-411f-4f26-a0e6-247b5bca981a" />

#### Performance Test after Indexing: 
- `db.orders.find({ order_id: 'fa50974b-0eff-48e8-b48a-acb4645a2bdc' }).explain("executionStats")`
- `db.orders.find({ customer_id: '68093a71a723ce53da043a3f' }).explain("executionStats")`

<img width="301" alt="Screenshot 2025-04-24 at 00 11 34" src="https://github.com/user-attachments/assets/fa938d59-4efc-4098-811f-027b5afcd1d9" />
<img width="294" alt="Screenshot 2025-04-24 at 00 14 36" src="https://github.com/user-attachments/assets/75da3665-9118-41bb-866c-c6f78de0ab42" />
