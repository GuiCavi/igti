import fs from "fs";

import Cidades from "./Cidades.json";
import Estados from "./Estados.json";

const UFS = Estados.map((estado) => estado.Sigla);

const parseEstados = (cidades, estados) => {
  const estadosComCidades = Object.fromEntries(
    estados.map((estado) => [
      estado.Sigla,
      cidades.filter((cidade) => cidade.Estado === estado.ID),
    ]),
  );

  return estadosComCidades;
};

const criaEstadosJSON = (cidadesComEstados) => {
  try {
    if (!fs.existsSync("./output")) {
      fs.mkdirSync("./output");
    }

    Object.entries(cidadesComEstados).map(([name, content]) => {
      fs.writeFileSync(
        `./output/${name}.json`,
        JSON.stringify(content, null, 2),
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const buscaEstado = (uf) => {
  try {
    const content = fs.readFileSync(`./output/${uf}.json`, {
      encoding: "utf-8",
    });

    return JSON.parse(content);
  } catch (error) {
    console.log(error);
  }
};

const ordenaEstadosPorCidades = (ordem = "ASC") => {
  try {
    const estados = UFS.map((uf) => {
      const numeroDeCidades = buscaEstado(uf).length;
      return [uf, numeroDeCidades];
    });

    return estados
      .sort((a, b) => (ordem === "ASC" ? a[1] - b[1] : b[1] - a[1]))
      .slice(0, 5);
  } catch (error) {
    console.log(error);
  }
};

const filtraCidadePeloTamanhoDoNomePorEstado = (ordem = "HI") => {
  try {
    const estados = UFS.map((uf) => {
      const cidades = buscaEstado(uf).sort((a, b) =>
        a.Nome.localeCompare(b.Nome),
      );

      let cidadeFiltrada = cidades[0].Nome;

      cidades.slice(1).forEach((cidade) => {
        let cond = false;
        if (ordem === "HI") cond = cidade.Nome.length > cidadeFiltrada.length;
        if (ordem === "LO") cond = cidade.Nome.length < cidadeFiltrada.length;
        if (cond) cidadeFiltrada = cidade.Nome;
      });

      return [cidadeFiltrada, uf];
    });

    return estados;
  } catch (error) {
    console.log(error);
  }
};

const qualMaiorNomeDeCidadeEntreTodosEstados = (ordem = "HI") => {
  try {
    const estados = filtraCidadePeloTamanhoDoNomePorEstado(ordem).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );

    let cidadeFiltrada = estados[0];

    estados.slice(1).forEach((estado) => {
      let cond = false;
      if (ordem === "HI") cond = estado[0].length > cidadeFiltrada[0].length;
      if (ordem === "LO") cond = estado[0].length < cidadeFiltrada[0].length;
      if (cond) cidadeFiltrada = estado;
    });

    return cidadeFiltrada;
  } catch (error) {}
};

(async () => {
  const cidadesComEstados = parseEstados(Cidades, Estados);

  criaEstadosJSON(cidadesComEstados);
  const UF = "TO";
  const numeroDeCidades = buscaEstado(UF).length;

  console.log(
    "\n---------------------------------------------------------------------------------------------------\n",
  );

  console.log("Número de cidades por UF");
  console.log(`>>>> Em ${UF}, temos ${numeroDeCidades} cidades`);

  console.log(
    "\n---------------------------------------------------------------------------------------------------\n",
  );

  console.log("Estados ordenados pela menor quantidade de cidades");
  console.log(
    ordenaEstadosPorCidades("ASC")
      .reverse()
      .map((a) => a.join(" - ")),
  );

  console.log("\nEstados ordenados pela maior quantidade de cidades");
  console.log(ordenaEstadosPorCidades("DSC").map((a) => a.join(" - ")));

  console.log(
    "\n---------------------------------------------------------------------------------------------------\n",
  );

  console.log("Cidades com o maior nome entre as cidades dos seus estados");
  console.log(
    filtraCidadePeloTamanhoDoNomePorEstado("HI").map((a) => a.join(" - ")),
  );
  console.log("\nCidades com o menor nome entre as cidades dos seus estados");
  console.log(
    filtraCidadePeloTamanhoDoNomePorEstado("LO").map((a) => a.join(" - ")),
  );

  console.log(
    "\n---------------------------------------------------------------------------------------------------\n",
  );

  console.log("Cidade com o maior nome entre todos os estados");
  console.log(">>>>", qualMaiorNomeDeCidadeEntreTodosEstados("HI").join(" - "));
  console.log("\nCidade com o menor nome entre todos os estados");
  console.log(">>>>", qualMaiorNomeDeCidadeEntreTodosEstados("LO").join(" - "));

  console.log(
    ordenaEstadosPorCidades("DSC").reduce((prev, curr) => prev + curr[1], 0),
  );
  console.log(
    ordenaEstadosPorCidades("ASC").reduce((prev, curr) => prev + curr[1], 0),
  );
})();
