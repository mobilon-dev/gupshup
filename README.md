# @mobilon-dev/gupshup

[![npm version](https://badge.fury.io/js/%40mobilon-dev%2Fgupshup.svg)](https://badge.fury.io/js/%40mobilon-dev%2Fgupshup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Полнофункциональная TypeScript библиотека для работы с Gupshup WhatsApp Business API. Предоставляет удобные клиенты для отправки сообщений, управления шаблонами, подписками и бизнес-профилем.

## 📋 Содержание

- [Установка](#установка)
- [Быстрый старт](#быстрый-старт)
- [Клиенты](#клиенты)
  - [GupshupAPIClient](#gupshupapiclient)
  - [GupshupPartnerApiClient](#gupshuppartnerapiclient)
  - [GupshupPartnerTokenApiClient](#gupshuppartnertokenapiclient)
  - [GupshupPartnerServiceClient](#gupshuppartnerserviceclient)
- [Примеры использования](#примеры-использования)
- [Документация](#документация)
- [Полезные ссылки](#полезные-ссылки)
- [Лицензия](#лицензия)

## 🚀 Установка

```bash
npm install @mobilon-dev/gupshup
```

## ⚡ Быстрый старт

### Отправка текстового сообщения

```typescript
import { GupshupAPIClient } from '@mobilon-dev/gupshup';

const client = new GupshupAPIClient({
  API_KEY: 'your-api-key',
  APP_NAME: 'your-app-name',
  SOURCE_MOBILE_NUMBER: 'your-phone-number',
  APP_ID: 'your-app-id',
  debug: true
});

// Отправка простого текстового сообщения
const response = await client.sendTextMessage('79135292926', 'Привет!');
console.log(response.data);
```

## 🔧 Клиенты

### GupshupAPIClient

Основной клиент для работы с WhatsApp Business API. Позволяет отправлять различные типы сообщений и управлять бизнес-профилем.

**Возможности:**
- ✅ Отправка текстовых сообщений
- ✅ Отправка медиа-сообщений (изображения, видео, аудио, файлы, стикеры)
- ✅ Отправка шаблонных сообщений
- ✅ Отправка интерактивных сообщений (списки, быстрые ответы)
- ✅ Отправка контактных карточек и геолокации
- ✅ Управление бизнес-профилем
- ✅ Работа с подписками и opt-in пользователями
- ✅ Управление шаблонами сообщений

```typescript
const client = new GupshupAPIClient({
  API_KEY: 'your-api-key',
  APP_NAME: 'your-app-name',
  SOURCE_MOBILE_NUMBER: 'your-phone-number',
  APP_ID: 'your-app-id',
  debug: true
});
```

### GupshupPartnerApiClient

Клиент для работы с партнерским API Gupshup. Предоставляет расширенные возможности для партнеров.

**Возможности:**
- ✅ Управление подписками
- ✅ Создание и редактирование шаблонов
- ✅ Загрузка медиа-файлов
- ✅ Получение статистики и аналитики
- ✅ Управление бизнес-профилем

```typescript
const partnerClient = new GupshupPartnerApiClient({
  appId: 'your-app-id',
  appToken: 'your-app-token',
  debug: true
});
```

### GupshupPartnerTokenApiClient

Клиент для работы с токенами партнерского API. Управляет доступом к приложениям и созданием новых приложений.

**Возможности:**
- ✅ Получение токенов доступа для приложений
- ✅ Создание новых приложений
- ✅ Управление партнерскими приложениями
- ✅ Генерация ссылок авторизации

```typescript
const tokenClient = new GupshupPartnerTokenApiClient({
  partnerToken: 'your-partner-token',
  debug: true
});
```

### GupshupPartnerServiceClient

Сервисный клиент для аутентификации в партнерском портале.

**Возможности:**
- ✅ Аутентификация партнера
- ✅ Получение партнерского токена

```typescript
const serviceClient = new GupshupPartnerServiceClient({ debug: true });
const authData = await serviceClient.getPartnerToken('email@example.com', 'password');
```

## 📝 Примеры использования

### Отправка различных типов сообщений

```typescript
// Текстовое сообщение
await client.sendTextMessage('79135292926', 'Привет!');

// Изображение с подписью
await client.sendMediaImageMessage(
  '79135292926',
  'https://example.com/image.jpg',
  'Посмотрите на это изображение!'
);

// Шаблонное сообщение
await client.sendTemplateTextMessage(
  '79135292926',
  'template-id',
  ['параметр1', 'параметр2']
);

// Интерактивное сообщение со списком
await client.sendListMessage('79135292926', {
  title: 'Выберите опцию',
  body: 'Доступные варианты:',
  buttonText: 'Выбрать',
  sections: [{
    title: 'Опции',
    rows: [
      { id: '1', title: 'Опция 1', description: 'Описание опции 1' },
      { id: '2', title: 'Опция 2', description: 'Описание опции 2' }
    ]
  }]
});
```

### Работа с бизнес-профилем

```typescript
// Получение информации о бизнес-профиле
const profile = await client.getBusinessProfile();

// Обновление описания
await client.updateBusinessProfileAbout('Новое описание компании');

// Обновление фото профиля
await client.updateBusinessProfilePhoto('https://example.com/logo.jpg');
```

### Управление подписками

```typescript
// Добавление подписки
await client.addSubscription({
  phone: '79135292926',
  status: 'subscribed'
});

// Получение списка подписчиков
const subscribers = await client.getOptInUsersList();
```

### Работа с партнерским API

```typescript
// Получение всех подписок
const subscriptions = await partnerClient.getAllSubscriptions();

// Создание нового шаблона
const template = await partnerClient.createTemplate({
  name: 'welcome_template',
  category: 'UTILITY',
  components: [{
    type: 'HEADER',
    format: 'TEXT',
    text: 'Добро пожаловать!'
  }, {
    type: 'BODY',
    text: 'Спасибо за регистрацию, {{1}}!'
  }]
});

// Загрузка медиа-файла
const mediaId = await partnerClient.uploadMedia('path/to/image.jpg');
```

## 📚 Документация

Подробная документация с примерами доступна в папке `/docs` после сборки проекта:

```bash
npm run build
npm run docs:view
```

## 🔗 Полезные ссылки

- [Gupshup.io](https://gupshup.io) - Официальный сайт
- [Gupshup API Documentation](https://docs.gupshup.io/reference/msg) - API документация
- [Gupshup Telegram Group](https://t.me/ru_gupshup) - Сообщество в Telegram

## 🛠️ Разработка

### Установка зависимостей

```bash
npm install
```

### Сборка проекта

```bash
npm run build
```

### Запуск тестов

```bash
npm test
```

### Линтинг

```bash
npm run lint-fix
```

### Генерация документации

```bash
npm run docs:build
npm run docs:view
```

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для подробностей.

## 🤝 Поддержка

Если у вас есть вопросы или предложения, создайте issue в репозитории или обратитесь в [Telegram группу Gupshup](https://t.me/ru_gupshup).
