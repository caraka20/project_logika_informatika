import React, { useState } from "react";

const MainLogika = () => {
  const [expression, setExpression] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [result, setResult] = useState(null); // Menyimpan hasil evaluasi
  const [truthTable, setTruthTable] = useState([]); // Menyimpan tabel kebenaran

  // Fungsi untuk menangani klik tombol dan menambahkannya ke ekspresi logika
  const handleButtonClick = (value) => {
    if (expression === "" && ["∧", "∨", "→", "↔", ")"].includes(value)) {
      return; // Abaikan jika simbol logika ditekan pertama kali
    }
    // ok

    if (
      ["P", "Q", "R"].includes(lastInput) &&
      !["∧", "∨", "→", "↔", ")"].includes(value)
    ) {
      return; // Abaikan jika input tidak sesuai
    }

    if (
      ["P", "Q", "R"].includes(value) &&
      ["P", "Q", "R"].includes(lastInput)
    ) {
      return; // Abaikan jika variabel ditekan dua kali berturut-turut
    }

    if (
      ["∧", "∨", "→", "↔"].includes(value) &&
      ["∧", "∨", "→", "↔"].includes(lastInput)
    ) {
      return; // Abaikan jika simbol logika ditekan dua kali berturut-turut
    }

    if (["(", ")"].includes(value) && ["(", ")"].includes(lastInput)) {
      return; // Abaikan jika tanda kurung ditekan dua kali berturut-turut
    }

    setExpression((prev) => prev + value);
    setLastInput(value); // Set input terakhir
  };

  const handleClear = () => {
    setExpression(""); // Kosongkan ekspresi
    setLastInput(""); // Reset input terakhir
    setResult(null); // Reset hasil evaluasi
    setTruthTable([]); // Reset tabel kebenaran
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1)); // Hapus satu karakter
    setLastInput(""); // Reset input terakhir
  };

  // Fungsi untuk mengonversi ekspresi logika menjadi ekspresi JavaScript
  const evaluateExpression = (expr, P, Q, R) => {
    try {
      const jsExpr = expr
        .replace(/¬/g, "!") // Negasi
        .replace(/∧/g, "&&") // Konjungsi
        .replace(/∨/g, "||") // Disjungsi
        .replace(/→/g, "<=") // Implikasi
        .replace(/↔/g, "===") // Biimplikasi
        .replace(/P/g, P) // Variabel P
        .replace(/Q/g, Q) // Variabel Q
        .replace(/R/g, R); // Variabel R
      console.log(jsExpr);

      return eval(jsExpr); // Evaluasi ekspresi dengan eval
    } catch (e) {
      console.error("Error evaluating expression:", e);
      return null; // Jika ada kesalahan, kembalikan null
    }
  };

  // Ambil variabel unik dari ekspresi logika
  const getVariables = (expr) => {
    const vars = new Set(expr.match(/[PQR]/g) || []); // Ambil variabel P, Q, R
    return Array.from(vars); // Kembalikan sebagai array
  };

  // Fungsi untuk memecah ekspresi menjadi sub-ekspresi
  const getSubExpressions = (expr) => {
    const subExpressions = [];
    let bracketCount = 0;
    let currentSubExpr = "";

    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];

      // Tambahkan karakter ke ekspresi saat ini
      currentSubExpr += char;

      // Cek jika ada tanda kurung yang dibuka atau ditutup
      if (char === "(") {
        bracketCount++;
      } else if (char === ")") {
        bracketCount--;
      }

      // Simpan sub-ekspresi jika menemukan operator logika dan tidak dalam tanda kurung
      if (bracketCount === 0 && ["∧", "∨", "→", "↔"].includes(char)) {
        subExpressions.push(currentSubExpr.trim());
        currentSubExpr = ""; // Reset untuk sub-ekspresi berikutnya
      }
    }

    // Tambahkan sisa ekspresi jika ada
    if (currentSubExpr) {
      subExpressions.push(currentSubExpr.trim());
    }

    return subExpressions;
  };

  // Generate tabel kebenaran
  const generateTruthTable = () => {
    const variables = getVariables(expression); // pariable dalam bentu arrai
    const subExpressions = getSubExpressions(expression); // Dapatkan sub-ekspresi
    let combinations = [];

    // Buat kombinasi kebenaran sesuai jumlah variabel
    if (variables.length === 2) {
      combinations = [
        { P: true, Q: true },
        { P: true, Q: false },
        { P: false, Q: true },
        { P: false, Q: false },
      ];
    } else if (variables.length === 3) {
      combinations = [
        { P: true, Q: true, R: true },
        { P: true, Q: true, R: false },
        { P: true, Q: false, R: true },
        { P: true, Q: false, R: false },
        { P: false, Q: true, R: true },
        { P: false, Q: true, R: false },
        { P: false, Q: false, R: true },
        { P: false, Q: false, R: false },
      ];
    }

    // Evaluasi tabel kebenaran untuk setiap kombinasi
    const table = combinations.map((comb) => {
      const { P = false, Q = false, R = false } = comb;
      let row = { ...comb };

      // Evaluasi setiap sub-ekspresi dan tambahkan kolom untuk setiap sub-ekspresi
      subExpressions.forEach((subExpr) => {
        row[subExpr] = evaluateExpression(subExpr, P, Q, R);
      });

      // Evaluasi ekspresi utama (result)
      row["Result"] = evaluateExpression(expression, P, Q, R);

      return row;
    });

    setTruthTable(table); // Set hasil tabel kebenaran
  };

  const handleEnter = () => {
    generateTruthTable(); // Generate tabel kebenaran
    setLastInput(""); // Reset input terakhir
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="container bg-white p-6 h-full max-w-lg mx-auto rounded-lg shadow-lg">
        <div className="mb-6 text-xl font-semibold text-center text-gray-800">
          {expression || "Klik tombol untuk expresi Logika"}
        </div>

        {truthTable.length > 0 && (
          <div className="mt-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  {["P", "Q", "R"].map(
                    (variable) =>
                      getVariables(expression).includes(variable) && (
                        <th key={variable} className="border-b py-2 px-4">
                          {variable}
                        </th>
                      )
                  )}
                  <th className="border-b py-2 px-4">Expression</th>
                  <th className="border-b py-2 px-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {truthTable.map((row, index) => (
                  <tr key={index}>
                    {["P", "Q", "R"].map(
                      (variable) =>
                        getVariables(expression).includes(variable) && (
                          <td key={variable} className="border-b py-2 px-4">
                            {String(row[variable])}
                          </td>
                        )
                    )}
                    <td className="border-b py-2 px-4">{expression}</td>
                    <td className="border-b py-2 px-4">{String(row.Result)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("¬")}
          >
            ¬
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("∧")}
          >
            ∧
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("∨")}
          >
            ∨
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("→")}
          >
            →
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("↔")}
          >
            ↔
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("P")}
          >
            P
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("Q")}
          >
            Q
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("R")}
          >
            R
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick("(")}
          >
            (
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleButtonClick(")")}
          >
            )
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClear}
          >
            C
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBackspace}
          >
            ⌫
          </button>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          onClick={handleEnter}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default MainLogika;
