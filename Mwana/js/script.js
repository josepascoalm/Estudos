const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nomeO')
const sProj = document.querySelector('#m-nomeP')
const sObjectivo = document.querySelector('#m-objectivo')
const sParceiro = document.querySelector('#m-parceiro')
const sPatrocinio = document.querySelector('#m-patrocinio')
const sEndereco = document.querySelector('#m-endereco')
const sTelefone = document.querySelector('#m-telefone')
const sEmail = document.querySelector('#m-email')
const sDuracao = document.querySelector('#m-duracao')
const sActividades = document.querySelector('#m-actividades')
const sBeneficiarios = document.querySelector('#m-beneficiarios')
const sOrcamento = document.querySelector('#m-orcamento')
const btnGuardar = document.querySelector('#btnGuardar')
const btnCancelar = document.querySelector('#btnCancelar')

let itens
let id

function openModal(edit = false, index= 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nomeO
    sProj.value = itens[index].nomeP
    sObjectivo.value = itens[index].object
    sParceiro.value = itens[index].parceiro
    sPatrocinio.value = itens[index].patrocinio
    sEndereco.value = itens[index].endereco
    sTelefone.value = itens[index].telefone
    sEmail.value = itens[index].email
    sDuracao.value = itens[index].duracao
    sActividades.value = itens[index].actividades
    sBeneficiarios.value = itens[index].beneficiarios
    sOrcamento.value = itens[index].orcamento
    id = index
  } else {
    sNome.value =""
    sProj.value =""
    sObjectivo.value =""
    sParceiro.value =""
    sPatrocinio.value =""
    sEndereco.value = ""
    sTelefone.value =""
    sEmail.value =""
    sDuracao.value =""
    sActividades.value =""
    sBeneficiarios.value = ""
    sOrcamento.value=""
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
  <td>${item.nomeO}</td>
  <td>${item.nomeP}</td>
 <td>${item.object}</td>
  <td>${item.parceiro}</td>
<td>${item.patrocinio}</td>
  <td>${item.endereco}</td>
<td>${item.telefone}</td>
  <td>${item.email}</td>
<td>${item.telefone}</td>
  <td>${item.duracao}</td>
<td>${item.actividades}</td>
  <td>${item.beneficiarios}</td>
  <td>Kz ${item.orcamento}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
