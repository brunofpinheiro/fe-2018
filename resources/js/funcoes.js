var jsonList;
var edicao;
var indexSelecionado;

function initUI() {
    edicao = false;
    indexSelecionado = "";

    document.getElementById("titulo_pagina").innerHTML = "Seja bem-vindo(a)!";
    paintMenu("menu_home");
    hideSections();
    initJSON();
    menuConsultarClick();
}

function initJSON() {
    jsonList = {
        "pacientes":[
            {"primeiroNome":"Bruno",
            "sobrenome": "Pinheiro",
            "titulo": "doutor",
            "dataNascimento": "02/09/1989",
            "sexo": "M",
            "nomeMae": "Sandra Aparecida",
            "nomePai": "Eustaquio Noronha",
            "nacionalidade": "Brasileira",
            "logradouro": "Rua 1057",
            "complemento": "Quadra 125 Lote 12",
            "cep": "74825210",
            "bairro": "Pedro Ludovico",
            "municipio": "Goiânia",
            "estado": "Goiás",
            "foneFixo": "3555-5555",
            "foneCelular": "99999-9999",
            "email": "email@gmail.com"
            }
        ]
    }
}

function menuHomeClick() {
    document.getElementById("titulo_pagina").innerHTML = "Seja bem-vindo(a)!";
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

function cadastrarPaciente() {
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

    
    try {
        if (edicao == true) {
            atualizaPaciente(indexSelecionado);
            edicao = false;
        } else if (edicao == false) {
            jsonList.pacientes.push(paciente);
        }

        resetForm("frm_cadastrar");
          
        alert('Paciente ' + domPrimeiroNome.toUpperCase() + ' ' + domSobrenome.toUpperCase() + ' salvo!');
    } catch(e) {
        alert("ERRO: " + e.message);
    }
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
    var domTable = document.getElementById(table);
    var domRows = document.getElementById(table).rows;

    while (domRows.length > 1) {
        domTable.deleteRow(1);
    }
}

function loadJSONIntoTable(jsonObject) {
    var table;
    var arrKeys;
    var arrValues;
    let row;
    let col;
    let a;
    let linkText;
    
    domTable = document.getElementById("tbl_consultar");

    for (var p = 0; p < jsonObject.pacientes.length; p++) {
        arrKeys   = Object.keys(jsonObject.pacientes[p]);
        arrValues = Object.values(jsonObject.pacientes[p]);
        row       = document.createElement("tr");
        
        for (var v = 0; v < 5; v++) {
            col = document.createElement("td");
            col.appendChild(document.createTextNode(arrValues[v]));
            row.appendChild(col);
        }

        //coluna Editar
        col = document.createElement("td");
        a = document.createElement("a");
        var img = new Image();
        img.src = "resources/images/edit_icon.png";
        a.appendChild(img);
        a.title = "Editar";
        a.href = "#";
        col.appendChild(a);
        col.onclick = function() {
            edicao = true;
            indexSelecionado = this.parentNode.rowIndex-1;
            menuCadastrarClick();
            carregaPaciente(indexSelecionado);
        }
        row.appendChild(col);

        //coluna Excluir
        col = document.createElement("td");
        a = document.createElement("a");
        var img = new Image();
        img.src = "resources/images/delete_icon.png";
        a.appendChild(img);
        a.title = "Excluir";
        a.href = "#";
        col.appendChild(a);
        col.onclick = function() {
            if (window.confirm("Deseja realmente deletar esse paciente?")) {
                jsonObject.pacientes.splice(this.parentNode.rowIndex-1, 1);
                menuConsultarClick();
            }
        }
        row.appendChild(col);
        domTable.appendChild(row);
    }
}

function carregaPaciente(pacientePos) {
    arrValues = Object.values(jsonList.pacientes[pacientePos]);

    document.getElementById("ipt_primeiro_nome").value = arrValues[0];
    document.getElementById("ipt_sobrenome").value = arrValues[1];
    document.getElementById("ipt_titulo").value = arrValues[2];
    document.getElementById("ipt_data_nascimento").value = arrValues[3];
    arrValues[4] == "M" ? document.getElementById("radio_sexo_m").checked = true : document.getElementById("radio_sexo_f").checked = true
    document.getElementById("ipt_nome_mae").value = arrValues[5];
    document.getElementById("ipt_nome_pai").value = arrValues[6];
    document.getElementById("ipt_nacionalidade").value = arrValues[7];
    document.getElementById("ipt_logradouro").value = arrValues[8];
    document.getElementById("ipt_complemento").value = arrValues[9];
    document.getElementById("ipt_cep").value = arrValues[10];
    document.getElementById("ipt_bairro").value = arrValues[11];
    document.getElementById("ipt_municipio").value = arrValues[12];
    document.getElementById("ipt_estado").value = arrValues[13];
    document.getElementById("ipt_fone_fixo").value = arrValues[14];
    document.getElementById("ipt_fone_celular").value = arrValues[15];
    document.getElementById("ipt_email").value = arrValues[16];
}

function atualizaPaciente(index) {
    jsonList.pacientes[index].primeiroNome   = document.getElementById("ipt_primeiro_nome").value;    
    jsonList.pacientes[index].sobrenome      = document.getElementById("ipt_sobrenome").value;
    jsonList.pacientes[index].titulo         = document.getElementById("ipt_titulo").value;
    jsonList.pacientes[index].dataNascimento = document.getElementById("ipt_data_nascimento").value;
    jsonList.pacientes[index].sexo           = document.getElementById("radio_sexo_m").checked ? "M" : "F";
    jsonList.pacientes[index].nomeMae        = document.getElementById("ipt_nome_mae").value;
    jsonList.pacientes[index].nomePai        = document.getElementById("ipt_nome_pai").value;
    jsonList.pacientes[index].nacionalidade  = document.getElementById("ipt_nacionalidade").value;
    jsonList.pacientes[index].logradouro     = document.getElementById("ipt_logradouro").value;
    jsonList.pacientes[index].complemento    = document.getElementById("ipt_complemento").value;
    jsonList.pacientes[index].cep            = document.getElementById("ipt_cep").value;
    jsonList.pacientes[index].bairro         = document.getElementById("ipt_bairro").value;
    jsonList.pacientes[index].municipio      = document.getElementById("ipt_municipio").value;
    jsonList.pacientes[index].estado         = document.getElementById("ipt_estado").value;
    jsonList.pacientes[index].foneFixo       = document.getElementById("ipt_fone_fixo").value;
    jsonList.pacientes[index].foneCelular    = document.getElementById("ipt_fone_celular").value;
    jsonList.pacientes[index].email          = document.getElementById("ipt_email").value;
}

function filtrarPacientes() {
    let ftrPrimeiroNome;
    let ftrTitulo;

    ftrPrimeiroNome = document.getElementById("ftr_nome").value;
    ftrTitulo = document.getElementById("ftr_titulo").value;

    if (ftrPrimeiroNome != "") {
        buscarElementoJSON(ftrPrimeiroNome);
    }
}

function buscarElementoJSON(filtro) {
    var arrKeys;
    var arrValues;
    
    for (let o in jsonList) {
        arrKeys   = Object.keys(jsonObject.pacientes[o]);
        arrValues = Object.values(jsonObject.pacientes[o]);
        // jsonList.pacientes[index].primeiroNome
        for (var v in arrValues) {
            if (v == filtro) {
                
            }
        }
    }
}