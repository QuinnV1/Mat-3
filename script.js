// Объявление функции sknf с параметрами x, y, z и zero
function sknf(x, y, z, zero) {
    // Объявление пустого массива out для хранения термов СКНФ
    var out = [];
    // Объявление объектов A, B и C для соответствия значениям 0 и 1
    var A = { 0: "A", 1: "¬A" };
    var B = { 0: "B", 1: "¬B" };
    var C = { 0: "C", 1: "¬C" };
    
    // Проверка условия: если zero не истинно
    if (!zero) {
        // Проверка значения x: если x истинно, добавить ¬A в массив out, иначе добавить A
        if (x) {
            out.push(A[1]);
        } else {
            out.push(A[0]);
        }
        // Проверка значения y: если y истинно, добавить ¬B в массив out, иначе добавить B
        if (y) {
            out.push(B[1]);
        } else {
            out.push(B[0]);
        }
        // Проверка значения z: если z истинно, добавить ¬C в массив out, иначе добавить C
        if (z) {
            out.push(C[1]);
        } else {
            out.push(C[0]);
        }
        // Возврат строкового представления СКНФ, объединенного символом ∨
        return out.join(" ∨ ");
    }
}

// Поиск таблицы в документе
var table = document.querySelector("table");
// Объявление пустого массива result для хранения СКНФ
var result = [];

// Вложенные циклы для генерации всех возможных комбинаций A, B и C (0 и 1)
for (let A = 0; A < 2; A++) {
    for (let B = 0; B < 2; B++) {
        for (let C = 0; C < 2; C++) {
            // Вычисление значения F на основе заданных A, B и C
            const F = A || (C || (A && B && (!C)));
            // Проверка условия: если F не истинно (равно 0)
            if (!F) {
                // Создание новой строки в таблице
                var row = table.insertRow(-1);
                // Создание ячеек для A, B, C и СКНФ
                var cellA = row.insertCell(0);
                var cellB = row.insertCell(1);
                var cellC = row.insertCell(2);
                var cellSKNF = row.insertCell(3);
                
                // Установка текстового содержимого ячеек A, B и C
                cellA.textContent = A;
                cellB.textContent = B;
                cellC.textContent = C;
                // Вычисление и установка СКНФ для текущих A, B, C и F
                const sknfResult = sknf(A, B, C, Boolean(F));
                cellSKNF.textContent = sknfResult;
                // Добавление СКНФ в массив result
                result.push(sknfResult);
            }
        }
    }
}

// Создание абзаца для вывода СКНФ
const sknfOutput = document.createElement("p");
// Установка текстового содержимого абзаца как строка СКНФ, объединенная символами & и ()
sknfOutput.textContent = "СКНФ: (" + result.join(") & (") + ")";
// Добавление абзаца в тело документа
document.body.appendChild(sknfOutput);