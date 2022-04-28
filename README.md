# Angular project for SoftUni course
Angular November 2020 / Retake Angular April 2022
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Техническа информация
### Структура на проекта:
•	клиентската част, изпълнена с Angular, намира се в директория: Cars

•	сървърна част, изпълнена чрез Firebase

### База данни:
Използвана е база данни Firebase Database в комбинация с Firebase Storage.
Примерните данни са заредени в базата 

## Стартиране на проекта

Инсталиране чрез команда `ng serve`. Навигирайте към `http://localhost:4200/`.

## Описание на сайта:
### Име на сайта: MyCar
### Описание на сайта:
Сайта за обяви за автомобили. Позволява преглед на обяви, публикувани от всички потребители, търсене по марка или марка и модел, добавянето на избрани обяви в собствен списък с наблюдавани обяви, публикуване на обяви от потребителите, техния преглед, редактиране и изтриване. Освен обичайната изисквана информация за марка, модел, цена и т.н. има възможност за добавяне на до 5 снимки към всяка обява. Добавянето на снимки е чрез прикачване на файл, който се запазва във Firebase Storage (а не  чрез въвеждане на адрес, на който е съхранена снимката). В обявата се показва превю на всички прикачени снимки и при клик върху превюто, снимката се показва в по-голям формат.
### Карта на сайта:
За нелогнати потребители

•	Начална (Home) страница

•	Регистрация

•	Вход

За логнати потребители

•	Търсене (включва списък с всички публикувани обяви)

•	Детайли (показва пълната информация за избрана обяви с възможност за преглед на всички снимки или изтриване на обявата от собственика и)

•	Продай (форма за добавяне на нова обява за продажба на автомобил)

•	Редактирай (форма за редактиране на текста и снимките на избрана обява)

•	Моя списък за наблюдение (показва обяви, които потребителят e избрал да наблючдава)

•	Мои автомобили - показва публикуваните от потребителя обяви

## Права за създаване/редактиране/изтриване:
Всички потребители са с еднакъв статут и могат да създават обяви, да редактират/изтриват само собствените си обяви.
Всички потребители могат да разглеждат всички обяви, да ги добавят в собствен списък с наблючдавани обяви или да премахват обяви от него. 

## Допълнителна информация:

###•	автентикация чрез Firebase Authentication

###•	използване на NGBootstrap за дизайн на потребителския интерфейс вкл. responsive design

###•	използване на  Firebase Storage за съхраняване на файлове (снимки)  на потребителя

###•	актуализация на страниците чрез subscribe към заявки към realtime база данни (Firebase Database)

###•	използване на оператори от библиотеката RxJS за получаване на данни чрез комплексни асинхронни заявки(map, switchMap, combineLatest, finalize)

###•	споделяне на данни чрез Subject
