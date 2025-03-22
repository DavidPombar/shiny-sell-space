# 📊 Analytics Event Tracking Summary

| File / Component     | GA4 Event        | Trigger Description                     | Parameters                                                                                                         | Example `dataLayer.push()`                                                                                                 |
|----------------------|------------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `ProductCard.tsx`    | `view_item`      | When user clicks on a product card       | `currency` (string), `value` (number), `items` (array)                                                            | ```js<br>window.dataLayer.push({<br>  event: "view_item",<br>  ecommerce: {<br>    currency: "USD",<br>    value: 99.99,<br>    items: [{<br>      item_name: "Product Name",<br>      item_id: "123",<br>      price: 99.99,<br>      quantity: 1<br>    }]<br>  }<br>});<br>``` |
| `ProductCard.tsx`    | `add_to_cart`    | When user clicks "Add to Cart" button    | `currency` (string), `value` (number), `items` (array)                                                            | ```js<br>window.dataLayer.push({<br>  event: "add_to_cart",<br>  ecommerce: {<br>    currency: "USD",<br>    value: 99.99,<br>    items: [{<br>      item_name: "Product Name",<br>      item_id: "123",<br>      price: 99.99,<br>      quantity: 1<br>    }]<br>  }<br>});<br>``` |
| `CartItem.tsx`       | `add_to_cart`    | When user increases item quantity        | `currency` (string), `value` (number), `items` (array)                                                            | ```js<br>window.dataLayer.push({<br>  event: "add_to_cart",<br>  ecommerce: {<br>    currency: "USD",<br>    value: 199.98,<br>    items: [{<br>      item_name: "Product Name",<br>      item_id: "123",<br>      price: 99.99,<br>      quantity: 2<br>    }]<br>  }<br>});<br>``` |
| `CartItem.tsx`       | `remove_from_cart` | When user decreases quantity or removes item | `currency` (string), `value` (number), `items` (array)                                                         | ```js<br>window.dataLayer.push({<br>  event: "remove_from_cart",<br>  ecommerce: {<br>    currency: "USD",<br>    value: 99.99,<br>    items: [{<br>      item_name: "Product Name",<br>      item_id: "123",<br>      price: 99.99,<br>      quantity: 1<br>    }]<br>  }<br>});<br>``` |
| `OrderSummary.tsx`   | `begin_checkout` | When checkout summary is displayed       | `currency` (string), `value` (number), `items` (array)                                                            | ```js<br>window.dataLayer.push({<br>  event: "begin_checkout",<br>  ecommerce: {<br>    currency: "USD",<br>    value: 199.98,<br>    items: [{<br>      item_name: "Product Name",<br>      item_id: "123",<br>      price: 99.99,<br>      quantity: 2<br>    }]<br>  }<br>});<br>``` |
| `Products.tsx`       | `view_item_list` | When product list loads or category changes | `currency` (string), `value` (number), `items` (array), `item_list_name` (string)                              | ```js<br>window.dataLayer.push({<br>  event: "view_item_list",<br>  ecommerce: {<br>    currency: "USD",<br>    value: 999.90,<br>    items: [...],<br>  },<br>  item_list_name: "All Products"<br>});<br>``` |
| `Products.tsx`       | `filter`         | When user applies category filter        | `filter_name` (string), `filter_value` (string)                                                                   | ```js<br>window.dataLayer.push({<br>  event: "filter",<br>  filter_name: "category",<br>  filter_value: "Electronics"<br>});<br>``` |

## Notas Adicionales

### Estructura de Datos Común
Todos los eventos de ecommerce comparten una estructura común para los items:
```typescript
{
  item_name: string;  // Nombre del producto
  item_id: string;    // ID único del producto
  price: number;      // Precio unitario
  quantity: number;   // Cantidad
}
```

### Tipos de Eventos Implementados
1. **Eventos de Vista**
   - `view_item`: Vista de producto individual
   - `view_item_list`: Vista de lista de productos
   - `view_cart`: Vista del carrito

2. **Eventos de Carrito**
   - `add_to_cart`: Añadir al carrito
   - `remove_from_cart`: Eliminar del carrito

3. **Eventos de Checkout**
   - `begin_checkout`: Inicio del proceso de checkout

4. **Eventos de Filtrado**
   - `filter`: Aplicación de filtros

### Mejores Prácticas
1. Todos los eventos siguen el estándar GA4
2. Los valores monetarios siempre incluyen la moneda (USD)
3. Las cantidades son siempre números enteros positivos
4. Los IDs de productos son únicos y consistentes
5. Los nombres de eventos usan snake_case 