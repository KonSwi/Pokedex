# Cel projektu

Stworzenie aplikacji Pokédex, jako projekt zaliczeniowy modułu 2. kursu Akademii Devstock. Aplikacja umożliwia przeglądanie, wyszukiwanie, edytowanie i tworzenie Pokémonów. Pozwala też na zestawianie walk między Pokémonami, prowadzenie rankingu oraz tworzenie listy ulubionych postaci.

# Jak uruchomić projekt?

1. Sklonuj repozytorium wpisując w terminalu:

   git clone https://github.com/KonSwi/Pokedex.git

   cd pokedex

2. Zainstaluj zależności wpisując w terminalu:

   npm install

3. Uruchom frontend wpisując w terminalu:

   npm run dev

4. Uruchom przeglądarkę i wejdź na stronę:

   http://localhost:5173/

5. Baw się wyśmienicie!

6. W celu przywrócenia projektu do stanu początkowego wpisz w terminalu:

   npm run reset

## UWAGA ## 
Jeśli widzisz błąd „Unexpected token” wykonaj następujące kroki: 
- otwórz w przeglądarce DevTools (F12),
- wejdź w "Application" → "LocalStorage" → "http://localhost:5173",
- usuń wpis "loggedUser".


# Funkcjonalności

- Rejestracja i logowanie użytkownika
- Lista Pokémonów z API (150) + własne z JSON-servera
- Wyszukiwarka z filtrowaniem w czasie rzeczywistym
- Karta szczegółów pokémona (EXP, wzrost, waga, umiejętności)
- Dodawanie/Usuwanie ulubionych
- Dodawanie Pokémonów na arenę (max 2)
- Walka: zwycięzca wyłoniony na podstawie wzoru: EXP \* waga
- Ranking z opcją sortowania w czterech możliwościach
- Edytowanie danych oraz tworzenie nowych Pokémonów
- Responsywność dla ekranów o szerokości 768px i 320px

# Technologie

- React (Vite)
- CSS Modules
- Context API
- React Hook Form + Zod
- React Router DOM
- JSON-server
- Notistack
- Fetch API

# Testy

- Przetestowano wszystkie ścieżki dla gościa oraz zalogowanego użytkownika
