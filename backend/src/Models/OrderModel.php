<?php

namespace App\Models;

use Throwable;
use Exception;

class OrderModel extends AbstractModel
{

    public function createOrder(array $orderData, array $items)
    {
        try {
            // to insure atomicity
            $this->db->beginTransaction();

            $stmt = $this->db->prepare("
                INSERT INTO orders (total_amount, currency_label, status) 
                VALUES (:total, :currency, 'pending')
            ");

            $stmt->execute([
                'total' => $orderData['total_amount'],
                'currency' => $orderData['currency_label']
            ]);


            $orderId = $this->db->lastInsertId();

            $itemStmt = $this->db->prepare("
                INSERT INTO order_items (order_id, product_id, quantity, selected_attributes) 
                VALUES (:order_id, :product_id, :qty, :attrs)
            ");

            foreach ($items as $item) {
                $itemStmt->execute([
                    'order_id'   => $orderId,
                    'product_id' => $item['product_id'],
                    'qty'        => $item['quantity'],
                    'attrs'      => $item['selected_attributes']
                ]);
            }
            $this->db->commit();

            return (int)$orderId;
        } catch (Throwable $e) {
            $this->db->rollBack();
            throw new Exception("Checkout failed: " . $e->getMessage());
        }
    }
}
