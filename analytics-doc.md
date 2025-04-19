# Analytics Instrumentation Overview

Esta tabla documenta todas las interacciones de usuario detectadas en el código, junto con una sugerencia de nombre de evento GA4 para cada una.

| File / Component                | Interaction Description                                      | Suggested GA4 Event Name   |
|---------------------------------|-------------------------------------------------------------|---------------------------|
| `src/pages/Index.tsx`           | Página de inicio cargada                                    | `page_view`               |
| `src/pages/Products.tsx`        | Página de productos cargada                                 | `page_view`               |
| `src/pages/Products.tsx`        | Usuario abre el filtro de productos (móvil)                 | `filter_open`             |
| `src/pages/Products.tsx`        | Usuario selecciona una categoría de producto                | `filter_category`         |
| `src/pages/Products.tsx`        | Usuario limpia el filtro de categoría                       | `filter_clear`            |
| `src/pages/ProductDetail.tsx`   | Página de detalle de producto cargada                       | `page_view`               |
| `src/pages/ProductDetail.tsx`   | Usuario cambia la cantidad de producto                      | `quantity_change`         |
| `src/pages/ProductDetail.tsx`   | Usuario hace clic en "Add to Cart"                         | `add_to_cart`             |
| `src/pages/ProductDetail.tsx`   | Usuario navega entre tabs de información del producto       | `tab_change`              |
| `src/pages/Cart.tsx`            | Usuario abre/cierra el carrito                              | `cart_toggle`             |
| `src/pages/Cart.tsx`            | Usuario hace clic en "Checkout"                            | `begin_checkout`          |
| `src/pages/Cart.tsx`            | Usuario hace clic en "Clear Cart"                          | `clear_cart`              |
| `src/pages/Cart.tsx`            | Usuario hace clic en "Continue Shopping"                   | `continue_shopping`       |
| `src/pages/Checkout.tsx`        | Página de checkout cargada                                  | `page_view`               |
| `src/pages/Checkout.tsx`        | Usuario envía el formulario de compra                       | `purchase`                |
| `src/pages/Checkout.tsx`        | Usuario hace clic en "Continue Shopping" tras compra       | `continue_shopping`       |
| `src/pages/NotFound.tsx`        | Página 404 cargada                                          | `page_view`               |
| `src/pages/NotFound.tsx`        | Usuario hace clic en "Return to Home"                      | `navigation_click`        |
| `src/components/layout/Navbar.tsx` | Usuario hace clic en enlaces de navegación (Home, Products, etc.) | `navigation_click` |
| `src/components/layout/Navbar.tsx` | Usuario hace clic en el botón de carrito                    | `cart_toggle`             |
| `src/components/layout/Navbar.tsx` | Usuario abre/cierra el menú móvil                           | `menu_toggle`             |
| `src/components/sections/Hero.tsx` | Usuario hace clic en "Shop Now"                            | `cta_shop_now`            |
| `src/components/sections/Hero.tsx` | Usuario hace clic en "Learn More"                          | `cta_learn_more`          |
| `src/components/sections/FeaturedProducts.tsx` | Usuario hace clic en "View All"                  | `cta_view_all`            |
| `src/components/ui/ProductCard.tsx` | Usuario hace clic en la tarjeta de producto                | `view_product`            |
| `src/components/ui/ProductCard.tsx` | Usuario hace clic en "Add to Cart"                        | `add_to_cart`             |
| `src/components/ui/CartItem.tsx`    | Usuario elimina un producto del carrito                    | `remove_from_cart`        |
| `src/components/ui/CartItem.tsx`    | Usuario aumenta/disminuye la cantidad de un producto       | `quantity_change`         | 