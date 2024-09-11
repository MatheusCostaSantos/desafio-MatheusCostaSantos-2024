class RecintosZoo {
  animais = [
    {
      nome: "CROCODILO",
      tamanho: 3,
      bioma: ["rio"],
      carnivoro: true,
    },
    {
      nome: "GAZELA",
      tamanho: 2,
      bioma: ["savana"],
      carnivoro: false,
    },
    {
      nome: "HIPOPOTAMO",
      tamanho: 4,
      bioma: ["savana", "rio"],
      carnivoro: false,
    },
    {
      nome: "LEAO",
      tamanho: 3,
      bioma: ["savana"],
      carnivoro: true,
    },
    {
      nome: "LEOPARDO",
      tamanho: 2,
      bioma: ["savana"],
      carnivoro: true,
    },
    {
      nome: "MACACO",
      tamanho: 1,
      bioma: ["floresta", "savana"],
      carnivoro: false,
    },
  ];

  recinto = [
    {
      numero: 1,
      bioma: ["savana"],
      tamanho: 10,
      animaisExistentes: [3, "MACACO"],
      tamanhoOcupado: 3,
    },
    {
      numero: 2,
      bioma: ["floresta"],
      tamanho: 5,
      animaisExistentes: [],
      tamanhoOcupado: 0,
    },
    {
      numero: 3,
      bioma: ["savana", "rio"],
      tamanho: 7,
      animaisExistentes: [1, "GAZELA"],
      tamanhoOcupado: 2,
    },
    {
      numero: 4,
      bioma: ["rio"],
      tamanho: 8,
      animaisExistentes: [],
      tamanhoOcupado: 0,
    },
    {
      numero: 5,
      bioma: ["savana"],
      tamanho: 9,
      animaisExistentes: [1, "LEAO"],
      tamanhoOcupado: 3,
    },
  ];

  analisaRecintos(animal, quantidade) {
    const animalEncontrado = this.animais.find(
      (bicho) => bicho.nome === animal.toUpperCase()
    );

    if (!animalEncontrado) {
      return { erro: "Animal inválido" };
    }

    if (!(quantidade >= 1)) {
      return { erro: "Quantidade inválida" };
    }

    const recintosCompativeis = this.recinto.filter((recinto) => {
      const biomaCompativel = animalEncontrado.bioma.some((habitat) =>
        recinto.bioma.includes(habitat)
      );
      const espacoExtra =
        recinto.animaisExistentes.length > 0 &&
        recinto.animaisExistentes[1] !== animalEncontrado.nome
          ? 1
          : 0;

      const espacoSuficiente =
        recinto.tamanho - recinto.tamanhoOcupado >=
        animalEncontrado.tamanho * quantidade + espacoExtra;

      const animalExistente = this.animais.find(
        (bicho) => bicho.nome === recinto.animaisExistentes[1]
      );

      const regraHipopotamo =
        animalEncontrado.nome !== "HIPOPOTAMO" ||
        recinto.animaisExistentes.length === 0 ||
        (recinto.bioma.includes("savana") && recinto.bioma.includes("rio"));

      const regraConvivencia =
        recinto.animaisExistentes.length === 0 ||
        recinto.animaisExistentes[1] === animalEncontrado.nome ||
        (!animalEncontrado.carnivoro &&
          !animalExistente?.carnivoro &&
          (animalEncontrado.nome !== "HIPOPOTAMO" || regraHipopotamo));

      const regraMacaco =
        animalEncontrado.nome !== "MACACO" ||
        recinto.animaisExistentes.length > 0 ||
        quantidade > 1;

      return (
        biomaCompativel && espacoSuficiente && regraConvivencia && regraMacaco
      );
    });
    if (recintosCompativeis.length > 0) {
      const recintosParaTodoLote = recintosCompativeis.filter(
        (recinto) =>
          recinto.tamanho - recinto.tamanhoOcupado >=
          animalEncontrado.tamanho * quantidade
      );

      if (recintosParaTodoLote.length > 0) {
        const recintosFormatados = recintosParaTodoLote
          .sort((a, b) => a.numero - b.numero)
          .map((recinto) => {
            const espacoExtra =
              recinto.animaisExistentes.length > 0 &&
              recinto.animaisExistentes[1] !== animalEncontrado.nome
                ? 1
                : 0;
            const espacoLivre =
              recinto.tamanho -
              (recinto.tamanhoOcupado +
                animalEncontrado.tamanho * quantidade +
                espacoExtra);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
          });
        return { recintosViaveis: recintosFormatados };
      }
    }

    return { erro: "Não há recinto viável" };
  }
}

export { RecintosZoo as RecintosZoo };
