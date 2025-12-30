# Руководство по миграциям

## Создание миграции

Для создания новой миграции выполните:

```bash
# Из корня проекта
cd src
python -m alembic revision --autogenerate -m "Описание миграции"

# Или если alembic установлен глобально
alembic revision --autogenerate -m "Описание миграции"
```

## Применение миграций

```bash
cd src
python -m alembic upgrade head
```

## Откат миграции

```bash
cd src
python -m alembic downgrade -1
```

## Проверка текущей версии

```bash
cd src
python -m alembic current
```

## Важно

Перед созданием миграции убедитесь, что:
1. Все модели импортированы в `src/alembic/env.py`
2. База данных доступна и настроена в `alembic.ini`
3. Все зависимости установлены

## Текущие модели для миграции

- User (с полем canteen_id для связи с Canteen)
- Canteen
- MenuItem
- Order
- SubscriptionPackage
- UserSubscription
- Payment

Все модели уже импортированы в `src/alembic/env.py`.

