SELECT p.*, c.name as cat_name
       FROM products p
       LEFT JOIN categories c ON p.category = c.id
       WHERE p.current = false
       ORDER BY p.category, p.name
