Dokumentacja projektu 

Komponent App.vue: 

Cel i funkcjonalność: 

Główny komponent aplikacji Vue. Odpowiada za układ strony i inicjalizację globalnych elementów interfejsu, takich jak Dashboard oraz warunkowe wyświetlanie komponentu Dialog. Zawiera również <RouterView/>, który odpowiada za dynamiczne ładowanie komponentów zgodnych z aktualną trasą. 

Importowane komponenty: 

    Dashboard.vue: Komponent umieszczony na stałe – najpewniej pasek boczny lub panel informacji. 

    Dialog.vue: Komponent dialogowy, wyświetlany warunkowo w zależności od stanu globalnego. 

    useGlobalState.ts: Hook do zarządzania stanem globalnym (np. pinia lub reactive). 

    copyAction.ts: Funkcja cpy(), która najpewniej ustawia funkcjonalność kopiowania do schowka (prawdopodobnie nasłuch zdarzeń). 

Props: 

Brak — App.vue nie przyjmuje żadnych props. 

Emitowane zdarzenia: 

Brak — nie emituje własnych zdarzeń. 

Stan i logika: 

    Używa globalnego stanu przez useGlobalState(). Sprawdza, czy state.dialog.active jest true, aby pokazać Dialog. 

    Wywołuje funkcję cpy() przy załadowaniu komponentu — funkcja może ustawiać event listener do kopiowania danych. 

Struktura szablonu (template): 

    <RouterView/>: Główna przestrzeń na komponenty zależne od trasy (routing). 

    <Dashboard/>: Stały komponent pulpitu. 

    <Dialog/>: Warunkowo renderowany na podstawie stanu state.dialog.active. 

 

Plik main.ts: 

Cel i funkcjonalność: 

Punkt wejściowy aplikacji Vue 3. Odpowiada za utworzenie instancji aplikacji, konfigurację routingu i rejestrację globalnych pluginów (w tym FormKit), a następnie zamontowanie aplikacji na stronie. 

Importowane moduły i komponenty: 

    createApp z vue: Tworzy instancję aplikacji. 

    style.css: Globalne style projektu. 

    createRouter, createMemoryHistory z vue-router: Narzędzia do konfiguracji routingu. 

    Homepage.vue: Główny komponent przypisany do ścieżki /. 

    App.vue: Komponent główny aplikacji. 

    @formkit/vue (plugin, defaultConfig): Biblioteka do zarządzania formularzami. 

    formkit.config.ts: Własna konfiguracja dla FormKit. 

Routing: 

Tworzy prosty router z jedną trasą: 

    / → Homepage.vue 

Używa createMemoryHistory() – pamięciowego systemu nawigacji (np. do testów lub aplikacji niewymagających historii przeglądarki). 

Rejestracja i montowanie: 

Tworzy aplikację na podstawie App.vue, rejestruje router oraz FormKit, a następnie montuje ją w elemencie #app. 

Ts: 

createApp(App) 
  .use(router) 
  .use(plugin, defaultConfig(config)) 
  .mount('#app') 
 

Props: 

Brak — ten plik nie przyjmuje żadnych props. 

Emitowane zdarzenia: 

Brak — nie emituje zdarzeń. 

Interakcje z innymi komponentami lub API: 

    Łączy się z FormKit, umożliwiając korzystanie z zaawansowanych formularzy w całej aplikacji. 

    Router pozwala nawigować między komponentami zdefiniowanymi w routes. 

 

Plik index.html: 

Cel i funkcjonalność: 

Główny plik HTML, który służy jako szablon dla aplikacji frontendowej zbudowanej w Vue 3. Umożliwia osadzenie aplikacji w przeglądarce, wskazuje miejsce montowania Vue oraz ładuje plik startowy main.ts. 

Elementy struktury: 

<head> zawiera: 

    <meta charset="UTF-8"> – Ustawia kodowanie znaków na UTF-8. 

    <link rel="icon" ...> – Określa favicon aplikacji (/favicon.svg, 50×50 px). 

    <meta name="viewport" ...> – Zapewnia responsywność na urządzeniach mobilnych. 

    <title>Gatherly – Tytuł strony wyświetlany na karcie przeglądarki. 

<body> zawiera: 

    <div id="app"></div> – Główne miejsce montowania aplikacji Vue (do którego Vue przyczepia się poprzez main.ts). 

    <script type="module" src="/src/main.ts"></script> – Importuje główny plik aplikacji (punkt wejściowy) jako moduł ES. 

Props: 

Brak — ten plik nie używa komponentów ani nie przyjmuje props. 

Emitowane zdarzenia: 

Brak — plik HTML nie obsługuje bezpośrednio zdarzeń aplikacji. 

Interakcje z innymi komponentami lub API: 

    Ładuje aplikację Vue zdefiniowaną w main.ts. 

    Element #app jest punktem zaczepienia dla Vue (createApp(App).mount('#app')). 

 

Komponent Homepage.vue: 

Cel i funkcjonalność: 

Prosty komponent-strona, który pełni funkcję widoku głównego (strony startowej) w aplikacji. Renderuje komponent Storage, odpowiedzialny za wyświetlanie lub zarządzanie danymi lokalnymi, plikami lub zasobami użytkownika. 

Importowane komponenty: 

    Storage.vue – komponent zagnieżdżony, umieszczony wewnątrz folderu storage/. 

Props: 

Brak — Homepage nie przyjmuje żadnych props. 

Emitowane zdarzenia: 

Brak — nie emituje żadnych zdarzeń. 

Interakcje z innymi komponentami lub API: 

    Renderuje komponent Storage bez przekazywania danych ani atrybutów. 

    Służy jako widok dla trasy /, zdefiniowanej w main.ts. 

Struktura szablonu (template): 

Html 

<Storage></Storage> 

Minimalistyczny – cała zawartość ogranicza się do jednego komponentu podrzędnego. 

 

Folder storage: 

Komponent Storage.vue: 

Cel i funkcjonalność: 

Komponent pośredniczący, odpowiedzialny za renderowanie listy elementów (items) ze stanu globalnego. Każdy element przekazywany jest do komponentu Sleeve, który zajmuje się jego prezentacją. Storage działa jako kontener lub layout dla tych elementów. 

Importowane komponenty: 

    Sleeve.vue – komponent potomny odpowiedzialny za wizualizację pojedynczego elementu. 

    useGlobalState z ../../scripts/state – dostęp do globalnego stanu aplikacji, z którego pobierana jest lista state.items. 

Props: 

Brak — Storage nie przyjmuje żadnych props. 

Emitowane zdarzenia: 

Brak — nie emituje zdarzeń. 

Interakcje z innymi komponentami lub API: 

    Iteruje po state.items (pobranym z globalnego stanu). 

    Dla każdego elementu renderuje komponent Sleeve, przekazując mu: 

    item – obiekt danych, 

    key – klucz unikalny item.sleevekey!. 

Struktura szablonu (template): 

Html 

<div class="sleeve-storage" v-for="item in state.items"> 
  <Sleeve :key="item.sleevekey!" :item="item"/> 
</div> 

Każdy element listy renderowany jest w kontenerze .sleeve-storage. 

 

Komponent Sleeve.vue: 

Cel i funkcjonalność: 

Kompleksowy komponent prezentacyjno-interaktywny, który: 

    wyświetla dane pojedynczego elementu typu SleeveT, 

    umożliwia przeciąganie elementu (z zapamiętywaniem pozycji), 

    obsługuje kontekstowe menu (ContextWindow) oraz etykiety i przyciski, 

    reaguje na hover, kliknięcia i zmiany pozycji. 

Importowane komponenty: 

    Label.vue – renderuje etykietę z sleeve.label. 

    ContextButton.vue – przycisk otwierający kontekstowe menu. 

    Tag.vue – obecnie niewykorzystywany (zaimportowany, ale nieużywany). 

    ContextWindow.vue – okno z dodatkowymi opcjami kontekstowymi. 

Importowane narzędzia i funkcje: 

    VueUse: 

    useDraggable – umożliwia przeciąganie komponentu. 

    useElementHover – sprawdza, czy element jest aktualnie "hoverowany". 

    Vue: 

    ref, watch, defineProps, useTemplateRef – do zarządzania stanem i odwołań. 

    Typy: 

    SleeveT – typ danych reprezentujący pojedynczy element (np. link, notatkę itd.). 

    Position – typ pozycji z @vueuse/core. 

Props: 

    item: SleeveT – obiekt reprezentujący dane jednego "sleeve’a". 

Emitowane zdarzenia: 

Brak jawnych emitów, ale komponent zmienia stan i pozycję obiektu item, co może wpływać na inne części aplikacji (np. synchronizację). 

Interakcje z innymi komponentami lub API: 

    Przekazuje dane do Label, ContextButton, ContextWindow. 

    Dynamicznie ustawia styl komponentu na podstawie pozycji (useDraggable). 

    Przechowuje lokalny kontekstowy stan (sleeveState) – aktywność i pozycję menu kontekstowego. 

    Modyfikuje sleeve.position w czasie rzeczywistym i oferuje metodę changePos() do zmiany pozycji z zewnątrz. 

Zachowanie specjalne: 

    Po najechaniu myszką pokazuje link (a[href]). 

    Po kliknięciu ContextButton pokazuje ContextWindow w miejscu kliknięcia. 

    Przeciąganie aktualizuje pozycję sleeve i zamyka ContextWindow. 

Struktura szablonu (template): 

html 

<div class="sleeve-container" ref="el" :style="style" style="position: fixed;"> 
  <div class="content-container"> 
    <Label :textRaw="sleeve.label" /> 
    <a @click.prevent :style="!isHovered ? 'display: none' : ''" :href="sleeve.url.toString()"> 
      {{ sleeve.url.toString() }} 
    </a> 
  </div> 
  <ContextButton :toggle="toggle" /> 
  <ContextWindow :context="sleeveState.context" :item="item" /> 
</div> 
 

Komponent Label.vue: 

Cel i funkcjonalność: 

Komponent wyświetlający etykietę tekstową (najczęściej nazwę lub opis zasobu) wraz z zestawem statycznie zdefiniowanych tagów. Pełni funkcję elementu informacyjnego w komponentach takich jak Sleeve. 

Importowane komponenty: 

    Tag.vue – komponent renderujący pojedynczy tag w zestawie tagów. 

Props: 

    textRaw?: Ref<string> – opcjonalna referencja do tekstu, który ma być wyświetlany jako etykieta. Przekazywana jako obiekt Ref. 

Emitowane zdarzenia: 

Brak — komponent nie emituje żadnych zdarzeń. 

Interakcje z innymi komponentami lub API: 

    Przekazuje każdy element z lokalnej tablicy tags do komponentu Tag.vue jako prop tags. 

Zachowanie specjalne: 

    textRaw jest wyświetlany w ramach elementu <p>. 

    Pod tekstem etykiety renderowane są trzy statycznie określone tagi (xd, xd2, xd3) z przypisanymi kolorami tła. 

    Styl komponentu zapewnia responsywne dopasowanie i rozmieszczenie etykiety i tagów w jednej linii. 

Struktura szablonu (template): 

html 

<p> 
  {{ props.textRaw }} 
  <div class="tags"> 
    <Tag v-for="tag in tags" :tags="tag" /> 
  </div> 
</p> 

 

 

Komponent Tag.vue: 

Cel i funkcjonalność: 

Mały wizualny wskaźnik/tag wyświetlany jako kolorowa kropka. Służy do oznaczania etykiet w innych komponentach, np. w Label.vue. 

Props: 

    tags?: TagT – obiekt zawierający właściwości tagu, przede wszystkim kolor tła (bgColor). 

Typy: 

    TagT — typ definiujący strukturę obiektu tagu (np. bgColor: string, name: string). 

Emitowane zdarzenia: 

Brak — komponent nie emituje zdarzeń. 

Interakcje z innymi komponentami lub API: 

    Używany przez komponent Label.vue do wyświetlania wizualnych oznaczeń/tagów. 

Struktura szablonu (template): 

html 

<div :style="'background-color: ' + tags?.bgColor"  
     style="width:10px; height: 10px; border-radius: 50%;"> 

</div> 

Wyświetla okrągły, 10x10px kolorowy punkt o barwie podanej w tags.bgColor. 

Komponent ContextWindow.vue: 

Cel i funkcjonalność: 

Wyświetla kontekstowe menu (prawy klik lub menu opcji) powiązane z elementem Sleeve. Menu oferuje użytkownikowi zestaw działań, takich jak otwarcie linku, edycja, tagowanie, kategorie, podświetlenie i usunięcie elementu. 

Props: 

    item: SleeveT – obiekt reprezentujący pojedynczy "sleeve", na którym działa menu. 

    context: { active: boolean, position: Position } – stan menu kontekstowego: 

    active — czy menu jest widoczne, 

    position — pozycja, w której menu powinno się wyświetlić. 

Importowane funkcje i zmienne: 

    useGlobalState – dostęp do globalnych funkcji i stanu aplikacji. 

    DialogKind – enum do określania typu dialogu (tutaj do edycji Sleeve). 

    removeItem, showDialog, setDialog – funkcje zarządzające stanem globalnym: 

    removeItem – usuwa element o podanym kluczu, 

    setDialog i showDialog – służą do otwierania okien dialogowych. 

Dostępne akcje w menu (tiles): 

    "open" — otwiera URL sleeve.url w nowej karcie. 

    "edit" — wywołuje dialog edycji dla tego elementu. 

    "tag" — (akcja niezaimplementowana, tylko etykieta). 

    "categories" — (akcja niezaimplementowana). 

    "highlight" — (akcja niezaimplementowana). 

    "delete" — usuwa element ze stanu globalnego. 

Emitowane zdarzenia: 

Brak — korzysta z funkcji globalnych zamiast emitować zdarzenia. 

Interakcje z innymi komponentami lub API: 

    Używa globalnego stanu do usuwania i zarządzania dialogiem. 

    Jest wywoływany z komponentu Sleeve.vue i renderowany na podstawie jego stanu. 

Struktura szablonu (template): 

html 

<div :class="{ active: context.active }" class="container" :style="{ 
  left: context.position.x - item.position.x + 'px', 
  top: context.position.y - item.position.y + 'px' 
}"> 
  <div class="context-menu"> 
    <div class="tile" v-for="tile in tiles"> 
      <div @click="tile[1]">{{ tile[0] }}</div> 
    </div> 
  </div> 
</div> 

    Menu pozycjonowane jest absolutnie względem pozycji elementu Sleeve. 

    Menu jest widoczne tylko, gdy context.active jest true. 

 

Komponent ContextButton.vue: 

Cel i funkcjonalność: 

Prosty przycisk, który wywołuje przekazaną funkcję toggle po kliknięciu. Służy do włączania lub wyłączania menu kontekstowego w komponencie nadrzędnym (Sleeve.vue). 

Props: 

    toggle: (e: MouseEvent) => void – funkcja, która jest wywoływana podczas kliknięcia przycisku. Odbiera obiekt zdarzenia myszy. 

Emitowane zdarzenia: 

Brak — obsługa zdarzenia kliknięcia odbywa się przez wywołanie funkcji przekazanej w propie toggle. 

Interakcje z innymi komponentami lub API: 

    Komponent jest używany w Sleeve.vue, gdzie funkcja toggle zarządza stanem menu kontekstowego. 

Struktura szablonu (template): 

html 

<button @click="(e) => props.toggle(e)">+</button> 

    Przycisk z tekstem "+". 

    Kliknięcie wywołuje toggle z eventem kliknięcia. 

 

Folder dashboard: 

Komponent Dashboard.vue: 

Cel i funkcjonalność: 

Panel kontrolny (dashboard) umożliwiający użytkownikowi szybki dostęp do różnych funkcji aplikacji, takich jak dodawanie elementów, sortowanie, filtrowanie, logowanie, edycja dialogów, ustawienia oraz testowe dodanie przykładowych danych (do celów developerskich). 

Kluczowe elementy: 

    tiles – tablica akcji, każda składa się z nazwy (string lub number) oraz funkcji (bind), która jest wywoływana po kliknięciu kafelka. 

Dostępne akcje: 

    "add" — otwiera dialog dodawania nowego elementu typu Sleeve. 

    "sort" — wywołuje funkcję sortowania (importowaną z ../../scripts/sort). 

    "filter" — obecnie pusta funkcja, przeznaczona do przyszłej implementacji filtrowania. 

    "User" — otwiera dialog autoryzacji/użytkownika. 

    "dialog" — otwiera dialog edycji Sleeve. 

    "???" — testowa funkcja developerska, która dodaje zestaw przykładowych elementów z sleeves do globalnego stanu. 

    "settings" — otwiera dialog ustawień aplikacji. 

Importy: 

    sort — funkcja sortująca. 

    sleeves — przykładowe dane (dummy data). 

    useGlobalState — dostęp do globalnych funkcji i stanu. 

    DialogKind — enum definiujący typy dialogów. 

Interakcje z innymi komponentami lub API: 

    Korzysta z globalnego stanu do wywoływania dialogów i dodawania elementów. 

    Każda akcja jest powiązana z odpowiednią funkcją w globalnym stanie. 

Struktura szablonu (template): 

html 

<div class="container-dashboard"> 
  <div @click="tile[1]" class="tile" v-for="tile in tiles"> 
    {{ tile[0] }} 
  </div> 
</div> 

    Renderuje listę "kafelków" (tile) z nazwami akcji. 

    Kliknięcie na kafelek wywołuje przypisaną funkcję. 

 

Folder dialogs: 

Komponent Dialog.vue: 

Cel i funkcjonalność: 

Komponent nadrzędny obsługujący wyświetlanie różnych typów okien dialogowych (modali) w aplikacji. Na podstawie globalnego stanu decyduje, który konkretny dialog ma być aktualnie widoczny. 

Funkcjonalności: 

    Wyświetla odpowiedni dialog w zależności od typu state.dialog.kind. 

    Umożliwia zamknięcie dialogu poprzez kliknięcie przycisku "x", który ustawia widoczność dialogu na false. 

Importowane komponenty dialogów: 

    EditContextDialog.vue — dialog do edycji elementu. 

    AddContextDialog.vue — dialog do dodawania nowego elementu. 

    AuthDialog.vue — dialog logowania/autoryzacji. 

    PlaceholderContextDialog.vue — placeholder dla niezaimplementowanych dialogów. 

    SettingsDialog.vue — dialog ustawień aplikacji. 

Props: 

Brak — komponent korzysta z globalnego stanu useGlobalState(). 

Globalny stan: 

    state.dialog.kind — enum DialogKind określający aktualny typ wyświetlanego dialogu. 

    showDialog(boolean) — funkcja służąca do otwierania i zamykania dialogów. 

Struktura szablonu (template): 

html 

<div class="dialog-container"> 
  <div class="dialog-header"> 
    <button @click="showDialog(false)">x</button> 
  </div> 
  <div class="dialog-content"> 
    <EditContextDialog v-if="state.dialog.kind == DialogKind.SleeveEdit" /> 
    <AddContextDialog v-else-if="state.dialog.kind == DialogKind.SleeveAdd" /> 
    <AuthDialog v-else-if="state.dialog.kind == DialogKind.Auth" /> 
    <PlaceholderContextDialog v-else-if="state.dialog.kind == DialogKind.Placeholder" /> 
    <SettingsDialog v-else-if="state.dialog.kind == DialogKind.Settings" /> 
  </div> 
</div> 

    Przycisk zamknięcia dialogu jest dostępny w nagłówku. 

    Zawartość dialogu jest dynamicznie dobierana w oparciu o typ dialogu. 

PONIZSZE DWA DIALOG ( ADD I EDIT ) ZOSTALY ZMERGOWANE W JEDEN, SLEEVECONTEXTDIALOG.VUE CO OZNNACZA ZE ICH BEHAVIOR ZOSTAL ZMERGOWANY. W zaleznosci czy context jest nullem czy nie, element jest tworzyony / zmieniany. Poza tym wszystko prawie tak samo 

Komponent AddContextDialog.vue: 

Cel i funkcjonalność: 

Dialog umożliwiający użytkownikowi dodanie nowego elementu typu Sleeve poprzez formularz z polami: etykieta (label) i adres URL (url). Po zatwierdzeniu formularza element zostaje dodany do globalnego stanu, a dialog zostaje zamknięty. 

Stan lokalny: 

    label — reactive zmienna powiązana z polem tekstowym do wpisania nazwy (etykiety) elementu. 

    url — reactive zmienna powiązana z polem URL do wpisania adresu. 

Oba pola są domyślnie wypełnione wartościami z aktualnego kontekstu dialogu, jeśli istnieje (getDialogContext()). 

Funkcje: 

    onSubmit() — tworzy nowy obiekt SleeveT z wartości label i url, dodaje go do globalnego stanu (addItem) i zamyka dialog (showDialog(false)). 

Importy: 

    useGlobalState — dostęp do globalnych funkcji i stanu aplikacji. 

    ref z Vue — tworzenie reaktywnych zmiennych. 

    SleeveT — typ/model reprezentujący element Sleeve. 

Struktura szablonu (template): 

html 

<form> 
  <label for="label"> 
    label: 
    <input type="text" name="label" id="label" v-model="label"> 
  </label> 
 
  <label for="url"> 
    url: 
    <input type="url" name="url" id="url" v-model="url"> 
  </label> 
  <input @click.prevent="onSubmit" type="button" value="Add" id="submit"> 
</form> 

    Formularz zawiera dwa pola: tekstowe dla etykiety oraz url. 

    Przycisk „Add” wywołuje funkcję onSubmit bez przeładowania strony (@click.prevent). 

 

Komponent: EditContextDialog.vue 

Cel i funkcjonalność: 

Dialog służący do edycji istniejącego elementu typu Sleeve. Pozwala na zmianę nazwy (label), URL oraz dodanie tagu z nazwą i kolorem. 

Stan lokalny: 

    label — reactive zmienna powiązana z polem tekstowym do edycji etykiety elementu. 

    url — reactive zmienna powiązana z polem URL do edycji adresu. 

    tagName — reactive zmienna dla nazwy tagu, którą można dodać. 

    tagColor — reactive zmienna dla koloru tagu, domyślnie ustawiona na #5a5dbc. 

Wartości label i url są inicjalizowane z kontekstu dialogu (getDialogContext()). 

Funkcjonalność: 

    Przycisk Update wywołuje metodę changeItem(label, url) na aktualnym obiekcie Sleeve pobranym z kontekstu dialogu, co powoduje aktualizację danych elementu. 

    Dodawanie tagu jest przygotowane wizualnie, ale w przesłanym kodzie nie ma powiązanej logiki dodawania tagu. 

Importy: 

    useGlobalState — dostęp do globalnego stanu i funkcji. 

    ref z Vue — do reaktywnych zmiennych. 

    Tag — komponent wyświetlający tagi (zaimportowany, ale nie użyty w tym kodzie). 

Struktura szablonu (template): 

html 

<form> 
  <label for="label"> 
    label: 
    <input type="text" name="label" id="label" v-model="label"> 
  </label> 
 
  <label for="url"> 
    url: 
    <input type="url" name="url" id="url" v-model="url"> 
  </label> 
 
  <label for="tagName"> 
    Tag: 
    <input type="text" id="tagName" v-model="tagName"> 
    <input type="color" id="tagColor" v-model="tagColor" value="#5a5dbc"> 
  </label> 
  <input @click.prevent="getDialogContext()?.changeItem(label, url)" type="button" value="Update" id="submit"> 
</form> 

    Formularz z polami do edycji label, url oraz dodania tagu. 

    Przycisk Update uruchamia aktualizację danych elementu. 

 

Komponent AuthDialog.vue: 

Cel i funkcjonalność: 

Dialog odpowiedzialny za autoryzację użytkownika, umożliwia przełączanie się między formularzem logowania a rejestracji. 

 

Stan lokalny: 

    logintab (ref boolean) — kontroluje, który formularz jest aktualnie widoczny: 

    true — formularz logowania 

    false — formularz rejestracji 

    submitted (ref boolean) — oznacza, czy formularz został przesłany (po symulowanym opóźnieniu). 

 

Funkcje: 

    loginHandler(x: loginForm) — asynchroniczna funkcja obsługująca logowanie. Przyjmuje obiekt loginForm z polami: name, password, remember. Po symulowanym opóźnieniu ustawia submitted na true. 

    registerHandler(x: registerForm) — asynchroniczna funkcja obsługująca rejestrację. Przyjmuje obiekt registerForm z polami: username, email, password. Po symulowanym opóźnieniu ustawia submitted na true. 

 

Struktura szablonu (template): 

    Przełącznik form: 

    Dwa przyciski Log In i Sign Up, które przełączają widoczność formularzy. 

    Styl selected wskazuje aktywną zakładkę. 

    Formularz logowania (v-if="logintab"): 

    Pola: nazwa użytkownika/email, hasło, checkbox „Remember me”. 

    Przycisk do submitu Log In. 

    Wysyłanie wywołuje loginHandler. 

    Formularz rejestracji (v-else): 

    Pola: username, email, hasło, powtórzenie hasła. 

    Walidacje na polach (wymagane, długość hasła, obecność cyfry, potwierdzenie hasła). 

    Przycisk Sign up. 

    Wysyłanie wywołuje registerHandler. 

 

Używane biblioteki i technologie: 

    FormKit — framework do budowy formularzy Vue (widoczne jako <FormKit>), ułatwia walidację i stylizację. 

    ref z Vue do reaktywności. 

 

Struktura szablonu (template): 

    Przełącznik form: 

    Dwa przyciski Log In i Sign Up, które przełączają widoczność formularzy. 

    Styl selected wskazuje aktywną zakładkę. 

    Formularz logowania (v-if="logintab"): 

    Pola: nazwa użytkownika/email, hasło, checkbox „Remember me”. 

    Przycisk do submitu Log In. 

    Wysyłanie wywołuje loginHandler. 

    Formularz rejestracji (v-else): 

    Pola: username, email, hasło, powtórzenie hasła. 

    Walidacje na polach (wymagane, długość hasła, obecność cyfry, potwierdzenie hasła). 

    Przycisk Sign up. 

    Wysyłanie wywołuje registerHandler. 

 

Używane biblioteki i technologie: 

    FormKit — framework do budowy formularzy Vue (widoczne jako <FormKit>), ułatwia walidację i stylizację. 

    ref z Vue do reaktywności. 

 

Komponent SettingsDialog.vue: 

Cel i funkcjonalność: 

Dialog odpowiedzialny za ustawienia aplikacji, pozwala użytkownikowi wybrać motyw kolorystyczny (theme) oraz język (locale). 

 

Stan lokalny i globalny: 

    Globalny stan: 

    state.theme — aktualnie wybrany motyw (theme), zarządzany przez useGlobalState. 

    Metody getTheme i setTheme do pobierania i ustawiania motywu. 

    Lokalny stan: 

    locale (ref) — wybrany język aplikacji, domyślnie ustawiony na Languages.English. 

 

Logika i metody: 

    applyTheme() — funkcja, która ustawia wybrany motyw jeśli nie jest równy Themes.None. Można ją wywołać po wybraniu motywu, aktualnie wymaga kliknięcia przycisku „Apply”. 

 

Szablon (template): 

    Wybór motywu (Theme select): 

    select z opcjami generowanymi dynamicznie na podstawie enum Themes (pomijając wartość None). 

    Domyślnie opcja „Select theme” jest wyłączona (disabled). 

    Przycisk „Apply” do zastosowania wybranego motywu. 

    Wybór języka (Locale select): 

    select z dwiema opcjami: English i Polish, sterowane przez lokalną zmienną locale. 

    Przycisk „Apply” (obecnie bez przypisanej metody, do implementacji). 

 

Biblioteki i technologie: 

    ref z Vue do reaktywności. 

    useGlobalState do globalnego stanu i metod zarządzania motywem. 

    enumFields (funkcja z utils) do iteracji po enumach. 

Komponent PlaceholderContextDialog.vue: 

Opis: 
 Jest to pusty, placeholderowy komponent dialogu. Aktualnie nie zawiera żadnej logiki ani UI, służy jako miejsce do dalszego rozwoju lub tymczasowa zawartość w dialogach. 

Zawartość: 

    Pusty <script setup lang="ts"> — brak logiki. 

    Pusty <template> — brak widocznych elementów. 

    Pusty <style scoped> — brak styli. 

Do czego służy: 

    Służy jako podstawowy szablon lub zapychacz w systemie dialogów aplikacji. 

    Może zostać rozwinięty w przyszłości, gdy będzie potrzebny dodatkowy typ dialogu. 

 

Folder scripts: 

Plik sort.ts: 

Opis: 
 Plik zawiera funkcję sort(), która służy do uporządkowania pozycji elementów w globalnym stanie aplikacji. 

Co robi: 

    Importuje globalny stan aplikacji za pomocą useGlobalState. 

    Iteruje przez wszystkie elementy znajdujące się w state.items. 

    Dla każdego elementu wywołuje metodę changePos, ustawiając mu pozycję X na 5, a pozycję Y na wartość równą indeksowi elementu pomnożonemu przez 75 pikseli. W ten sposób elementy są rozmieszczone pionowo z równymi odstępami. 

Do czego służy: 

    Umożliwia szybkie uporządkowanie wszystkich elementów na osi pionowej z ustaloną pozycją poziomą. 

    Przydatna na przykład do zorganizowania komponentów na dashboardzie w przejrzysty sposób. 

 

Plik state.ts: 

Opis: 
 Ten plik definiuje globalny stan aplikacji korzystając z funkcji createGlobalState z biblioteki @vueuse/core. Umożliwia zarządzanie elementami typu SleeveT, dialogami oraz motywem aplikacji. 

Szczegóły implementacji: 

    Stan (state) jest reaktywny i zawiera: 

    items: lista elementów SleeveT, które są głównymi obiektami zarządzanymi w aplikacji. 

    dialog: obiekt kontrolujący stan i kontekst wyświetlanego dialogu (czy jest aktywny, jaki typ dialogu i jaki element jest w nim edytowany). 

    theme: aktualny motyw kolorystyczny aplikacji, bazujący na enumeracji Themes. 

    Funkcje do zarządzania stanem: 

    getItem(sleevekey?): znajduje element o podanym kluczu sleevekey. 

    addItem(item): dodaje nowy element do listy items. 

    removeItem(sleevekey): usuwa element o podanym sleevekey z listy items. 

    showDialog(show): ustawia widoczność dialogu (true/false). 

    setDialog(dialogKind, context): ustawia rodzaj dialogu i kontekst (element, którego dotyczy). 

    getDialogContext(): zwraca kontekst aktualnego dialogu (element SleeveT lub null). 

    getTheme(): zwraca aktualny motyw. 

    setTheme(newTheme): ustawia nowy motyw i dynamicznie podmienia arkusz stylów CSS w <head>. Usuwa poprzedni link do motywu, a jeśli motyw to None, nie dodaje nowego stylu. 

Folder types: 

Plik enums.ts: 

Opis: 
 Ten plik definiuje trzy enumeracje (enum) używane w aplikacji do reprezentowania stałych wartości związanych z dialogami, motywami oraz językami. 

Szczegóły: 

    DialogKind – Typ wyliczeniowy opisujący różne rodzaje dialogów, które mogą być wyświetlane: 

    SleeveEdit — dialog edycji elementu typu Sleeve 

    SleeveAdd — dialog dodawania nowego elementu 

    Settings — dialog ustawień aplikacji 

    Auth — dialog uwierzytelniania (logowanie/rejestracja) 

    Placeholder — tymczasowy, placeholderowy dialog (do zastąpienia w przyszłości) 

    None — brak aktywnego dialogu 

    Themes – Typ wyliczeniowy opisujący dostępne motywy aplikacji: 

    Default — motyw domyślny 

    Midnight — motyw ciemny (np. nocny) 

    None — brak motywu, czyli bez dodatkowego stylu 

    Languages – Typ wyliczeniowy dla obsługiwanych języków aplikacji: 

    English 

    Polish 

 

Plik sleeve.ts: 

Opis: 

Ten plik definiuje klasę SleeveT, która służy do reprezentowania pojedynczego elementu (ang. sleeve) w aplikacji. Każdy obiekt SleeveT zawiera kluczowe dane i metody potrzebne do zarządzania tym elementem. 

 

Szczegóły implementacji: 

    Pola klasy: 

    label: reaktywna referencja (Ref<string>) przechowująca tekstową etykietę elementu. Dzięki temu, zmiany etykiety automatycznie odświeżają widok w Vue. 

    url: reaktywna referencja (Ref<string>) przechowująca adres URL powiązany z tym elementem. 

    position: obiekt z właściwościami x i y określający pozycję elementu na ekranie (współrzędne 2D). 

    sleevekey: unikalny identyfikator elementu. Jeśli nie zostanie podany podczas tworzenia, jest generowany losowo. 

    tags: tablica obiektów tagów (TagT[]), które mogą dodatkowo opisywać element. 

    Metody: 

    changePos(newx: number, newy: number): opcjonalna metoda, pozwalająca na zmianę pozycji elementu na ekranie. 

    changeItem(label: string, url: string): metoda aktualizująca wartości etykiety i URL elementu; dzięki temu łatwo można zmienić zawartość SleeveT bez potrzeby tworzenia nowego obiektu. 

 

Konstruktor: 

Podczas tworzenia nowego obiektu SleeveT przekazywane są etykieta (_label) i URL (_url). Opcjonalnie można podać unikalny klucz (_sleevekey) oraz funkcję do zmiany pozycji (_changePos). Jeżeli klucz nie zostanie przekazany, jest generowany dynamicznie przy pomocy losowej liczby na podstawie aktualnego czasu, co zapewnia unikalność. 

 

Plik types.ts: 

Opis: 

Plik types.ts definiuje podstawowe typy danych, które są używane w całej aplikacji do zachowania spójności i ułatwienia typowania. 

 

Szczegóły implementacji: 

    Typ Position: 
     Definiuje strukturę obiektu przechowującego pozycję na osi X i Y. 
     Składa się z dwóch właściwości: 

    x – liczba reprezentująca współrzędną poziomą 

    y – liczba reprezentująca współrzędną pionową 

    Typ TagT: 
     Reprezentuje tag, który może być przypisany do elementu (np. Sleeve). 
     Zawiera opcjonalne pola: 

    bgColor – ciąg znaków (string) określający kolor tła tagu, zwykle w formacie HEX (np. #5a5dbc) 

    name – nazwa tagu, również typu string 

 

Folder utils: 

Plik copyAction.ts: 

Opis: 

Plik copyaction.ts implementuje funkcjonalność nasłuchiwania zdarzenia wklejenia (paste) w przeglądarce i na jego podstawie otwierania dialogu dodawania nowego elementu (Sleeve) z automatycznie wypełnionym polem URL skopiowanym z systemowego schowka. 

 

Szczegóły implementacji: 

    Importuje funkcję useGlobalState z własnego stanu globalnego aplikacji, by zarządzać dialogami i stanem elementów. 

    Używa funkcji useEventListener z biblioteki @vueuse/core do dodania globalnego nasłuchiwania zdarzenia paste na dokumencie. 

    Po wykryciu zdarzenia paste: 

    Korzysta z API navigator.clipboard.readText(), aby odczytać tekst aktualnie znajdujący się w schowku systemowym. 

    Tworzy nowy obiekt SleeveT z pustą etykietą (label = "") i URL wypełnionym tym tekstem. 

    Ustawia ten obiekt jako kontekst dialogu dodawania nowego elementu (DialogKind.SleeveAdd). 

    Aktywuje wyświetlenie dialogu (showDialog(true)), dzięki czemu użytkownik może szybko zatwierdzić lub edytować nowy wpis. 

 

Plik utils.ts: 

Opis: 
Plik utils.ts zawiera funkcję pomocniczą enumFields, która umożliwia wygodne pobranie nazw pól z obiektu typu enum w TypeScript. Enumy w TS są dwukierunkowe i zawierają zarówno nazwy, jak i numeryczne indeksy, więc ta funkcja filtruje je, zwracając tylko nazwy. 

 

Funkcja enumFields: 

    Parametr: 

    supplier — obiekt typu enum (dowolny obiekt). 

    Działanie: 

    Pobiera wszystkie klucze obiektu za pomocą Object.keys(). 

    Następnie filtruje je, usuwając te, które są liczbami (indeksy enumu). 

    Zwraca tablicę kluczy (stringów) reprezentujących nazwy pól enumu. 

    Zwracany typ: 

    string[] — lista nazw enumu. 

Zastosowanie: 

    Ułatwia dynamiczne generowanie list opcji lub przy iteracji po enumach w kodzie UI, bez ryzyka pomylenia nazw z numerami. 

 

 

Dokumentacja backendu 

 

Swagger api jest dostępny pod localhost:3000/swagger. 

Backend wykorzystuje drizzle ORM do interakcji z bazą oraz elysii jako http server. 
 

 

 

Podział pracy 

 

Zuzanna – themeing, dokumentacja 

Wiktor – routing, db access, troche vue 

 

 

Jesli nie ma dockerfilea 

 

No to: 

 

Docker compose up –d w /back 

Npm run apply 

Npm run populate 

 

Potem npm run start na /back 

Npm run dev /front 

I dziala na porcie 

Localhost:5713 
