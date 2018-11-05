var jsonList;

function initUI() {
    document.getElementById("titulo_pagina").innerHTML = "Seja bem vindo(a)!";
    document.getElementById("menu_home").classList.add("selected_menu");
    hideSections();
    initJSON();
    // menuConsultarClick(); //TODO: tá aqui pra já carregar essa página na abertura
}

function initJSON() {
    jsonList = {
        "pacientes":[
            {"primeiroNome":"Bruno",
            "sobrenome": "Pinheiro",
            "titulo": "doutor",
            "dataNascimento": "02/09/1989",
            "sexo": "M"
            }
        ]
    }
}

function menuHomeClick() {
    document.getElementById("titulo_pagina").innerHTML = "Seja bem vindo(a)!";
    resetMenuStyling();
    hideSections();
    paintMenu("menu_home");
}

function menuCadastrarClick() {
    document.getElementById("titulo_pagina").innerHTML = "Cadastro de paciente";
    resetMenuStyling();
    paintMenu("menu_cadastrar");
    showSection("section_cadastrar");
}

function menuConsultarClick() {
    document.getElementById("titulo_pagina").innerHTML = "Consulta de paciente";
    resetMenuStyling();
    paintMenu("menu_consultar");
    showSection("section_consultar");
    resetTable("tbl_consultar");
    loadJSONIntoTable(jsonList);
}

function resetMenuStyling() {
    document.getElementById("menu_home").classList.remove("selected_menu");
    document.getElementById("menu_cadastrar").classList.remove("selected_menu");
    document.getElementById("menu_consultar").classList.remove("selected_menu");
}

function hideSections() {
    document.getElementById("section_cadastrar").style.display = "none";
    document.getElementById("section_consultar").style.display = "none";
}

function resetForm(formulario) {
    document.getElementById(formulario).reset();   
}

function salvarPaciente() {
    let domPrimeiroNome   = document.getElementById("ipt_primeiro_nome").value;
    let domSobrenome      = document.getElementById("ipt_sobrenome").value;
    let domTitulo         = document.getElementById("ipt_titulo").value;
    let domDataNascimento = document.getElementById("ipt_data_nascimento").value;
    let domSexo           = document.getElementById("radio_sexo_m").checked ? "M" : "F";
    let domNomeMae        = document.getElementById("ipt_nome_mae").value;
    let domNomePai        = document.getElementById("ipt_nome_pai").value;
    let domNacionalidade  = document.getElementById("ipt_nacionalidade").value;
    let domLogradouro     = document.getElementById("ipt_logradouro").value;
    let domComplemento    = document.getElementById("ipt_complemento").value;
    let domCep            = document.getElementById("ipt_cep").value;
    let domBairro         = document.getElementById("ipt_bairro").value;
    let domMunicipio      = document.getElementById("ipt_municipio").value;
    let domEstado         = document.getElementById("ipt_estado").value;
    let domFoneFixo       = document.getElementById("ipt_fone_fixo").value;
    let domFoneCelular    = document.getElementById("ipt_fone_celular").value;
    let domEmail          = document.getElementById("ipt_email").value;

    let paciente = {
        primeiroNome: domPrimeiroNome,
        sobrenome: domSobrenome,
        titulo: domTitulo,
        dataNascimento: domDataNascimento,
        sexo: domSexo,
        nomeMae: domNomeMae,
        nomePai: domNomePai,
        nacionalidade: domNacionalidade,
        logradouro: domLogradouro,
        complemento: domComplemento,
        cep: domCep,
        bairro: domBairro,
        municipio: domMunicipio,
        estado: domEstado,
        foneFixo: domFoneFixo,
        foneCelular: domFoneCelular,
        email: domEmail
    };

    jsonList.pacientes.push(paciente);

    resetForm("frm_cadastrar");

    alert('Paciente ' + domPrimeiroNome + ' ' + domSobrenome + ' salvo!');
}

function paintMenu(menu) {
    document.getElementById(menu).classList.add("selected_menu");
}

function showSection(section) {
    if (section === "section_cadastrar") {
        document.getElementById("section_cadastrar").style.display = "block";
        document.getElementById("section_consultar").style.display = "none";
    } else if (section === "section_consultar") {
        document.getElementById("section_cadastrar").style.display = "none";
        document.getElementById("section_consultar").style.display = "block";
    }
}

function resetTable(table) {
    tab = document.getElementById(table);

    for (var i = 1; i <= tab.rows.length; i++) {
        tab.deleteRow(i);
    }
}

function loadJSONIntoTable(jsonObject) {
    var table;
    var arrKeys;
    var arrValues;
    let row;
    let col;

    table = document.getElementById("tbl_consultar");

    for (var p in jsonObject.pacientes) {
        arrKeys   = Object.keys(jsonObject.pacientes[p]);
        arrValues = Object.values(jsonObject.pacientes[p]);
        row       = document.createElement("tr");
        
        for (var v in arrValues) {
            col = document.createElement("td");
            col.appendChild(document.createTextNode(arrValues[v]));
            row.appendChild(col);
        }
    }

    table.appendChild(row);
}