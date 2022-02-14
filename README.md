Среда разработки на основе [Monaco Editor][monaco]
==================================================

Экспериментальная среда разработки (IDE) на основе Monaco Editor, ReactJS и RollupJS.
Требуется разработать среду для выполнения JavaScript и TypeScript кода в оперативной
памяти браузера. Должна быть реализована поддержа модульности (import). Такая среда 
будет использоваться в приложениях, где требуется написание скриптов пользователем для
расширения возможностей приложений.

В основе проекта используется компонент [`@monaco-editor/react`][SurenAt93].

TODO:
-----

Осталось решить задачу со сборкой виртуальных модулей
https://github.com/khusamov/ide/issues/1


[SurenAt93]: https://github.com/SurenAt93/monaco-react
[monaco]: https://microsoft.github.io/monaco-editor/