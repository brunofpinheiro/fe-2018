var jsonList;

function initUI() {
    document.getElementById("titulo_pagina").innerHTML = "Seja bem vindo(a)!";
    document.getElementById("menu_home").classList.add("selected_menu");

    document.getElementById("section_cadastrar").style.display = "none";

    initJSON();
    // console.log(jsonList);

    menuCadastrarClick(); //TODO: retirar essa linha
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
    document.getElementById("menu_Home").classList.add("selected_menu");
}

function menuCadastrarClick() {
    document.getElementById("titulo_pagina").innerHTML = "Cadastro de paciente";
    resetMenuStyling();
    document.getElementById("menu_cadastrar").classList.add("selected_menu");
    document.getElementById("section_cadastrar").style.display = "block";
}

function menuConsultarClick() {
    document.getElementById("titulo_pagina").innerHTML = "Consulta de paciente";
    resetMenuStyling();
    document.getElementById("menu_consultar").classList.add("selected_menu");
}

function resetMenuStyling() {
    document.getElementById("menu_home").classList.remove("selected_menu");
    document.getElementById("menu_cadastrar").classList.remove("selected_menu");
    // document.getElementById("menu_alterar").classList.remove("selected_menu");
    // document.getElementById("menu_excluir").classList.remove("selected_menu");
    document.getElementById("menu_consultar").classList.remove("selected_menu");
}

function hideSections() {
    document.getElementById("section_cadastrar").style.display = "none";
}

function resetForm(formulario) {
    document.getElementById(formulario).reset();   
}

function salvarPaciente() {
    var domPrimeiroNome   = document.getElementById("ipt_primeiro_nome").value;
    var domSobrenome      = document.getElementById("ipt_sobrenome").value;
    var domTitulo         = document.getElementById("ipt_titulo").value;
    var domDataNascimento = document.getElementById("ipt_data_nascimento").value;
    var domSexo           = document.getElementById("radio_sexo_m").checked ? "M" : "F";
    var domNomeMae        = document.getElementById("ipt_nome_mae").value;
    var domNomePai        = document.getElementById("ipt_nome_pai").value;
    var domNacionalidade  = document.getElementById("ipt_nacionalidade").value;
    var domLogradouro     = document.getElementById("ipt_logradouro").value;
    var domComplemento    = document.getElementById("ipt_complemento").value;
    var domCep            = document.getElementById("ipt_cep").value;
    var domBairro         = document.getElementById("ipt_bairro").value;
    var domMunicipio      = document.getElementById("ipt_municipio").value;
    var domEstado         = document.getElementById("ipt_estado").value;
    var domFoneFixo       = document.getElementById("ipt_fone_fixo").value;
    var domFoneCelular    = document.getElementById("ipt_fone_celular").value;
    var domEmail          = document.getElementById("ipt_email").value;

    var paciente = {
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