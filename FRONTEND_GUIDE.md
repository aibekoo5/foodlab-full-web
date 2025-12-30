# Руководство для фронтенда

## Необходимые зависимости

### React/Next.js
```bash
npm install axios @tanstack/react-query
# или
npm install swr
```

### TypeScript типы
Все типы уже определены в API документации. Используйте их для type safety.

---

## Структура проекта фронтенда

```
frontend/
├── src/
│   ├── api/
│   │   ├── client.ts          # API клиент
│   │   ├── auth.ts            # Auth endpoints
│   │   ├── orders.ts          # Order endpoints
│   │   └── subscriptions.ts   # Subscription endpoints
│   ├── types/
│   │   └── index.ts           # TypeScript типы
│   ├── hooks/
│   │   ├── useAuth.ts         # Auth hook
│   │   ├── useOrders.ts       # Orders hook
│   │   └── useSubscriptions.ts
│   ├── components/
│   │   ├── QRScanner.tsx       # QR сканер
│   │   ├── OrderCard.tsx      # Карточка заказа
│   │   └── MenuItem.tsx       # Позиция меню
│   └── pages/
│       ├── Login.tsx
│       ├── QRScan.tsx
│       ├── Menu.tsx
│       └── Orders.tsx
```

---

## Примеры компонентов

### 1. QR Scanner Component
```typescript
import { useState } from 'react';
import { useCanteenByQR } from '../hooks/useCanteen';

export function QRScanner() {
  const [qrCode, setQrCode] = useState('');
  const { data: canteen, isLoading } = useCanteenByQR(qrCode);

  const handleScan = (result: string) => {
    setQrCode(result);
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (!canteen) return <div>Асхана не найдена</div>;

  return (
    <div>
      <h1>{canteen.name}</h1>
      <div>
        {canteen.menu_items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
```

### 2. Order Creation
```typescript
import { useState } from 'react';
import { useCreateOrder } from '../hooks/useOrders';

export function OrderForm({ canteenId, menuItems }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const createOrder = useCreateOrder();

  const handleSubmit = async () => {
    try {
      await createOrder.mutateAsync({
        canteen_id: canteenId,
        food_id: selectedFood?.id,
        drink_id: selectedDrink?.id,
      });
      alert('Заказ создан!');
    } catch (error) {
      if (error.message.includes('402')) {
        alert('Нет активной подписки или закончились обеды');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Форма выбора */}
    </form>
  );
}
```

---

## Следующие шаги для бэкенда

1. ✅ Создать миграции Alembic
2. ✅ Добавить связь User → Canteen (для роли CANTEEN)
3. ✅ Улучшить обработку ошибок
4. ✅ Добавить валидацию
5. ✅ Добавить тесты

