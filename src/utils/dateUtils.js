/**
 * Calcula a idade baseada na data de nascimento
 * @param {string} dataNascimento - Data de nascimento no formato YYYY-MM-DD
 * @returns {number} Idade em anos
 */
export function calcularIdade(dataNascimento) {
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }

  return idade
}

/**
 * Formata data ISO 8601 para formato brasileiro
 * @param {string} dataISO - Data no formato ISO 8601
 * @returns {string} Data formatada (DD/MM/YYYY HH:mm)
 */
export function formatarData(dataISO) {
  const data = new Date(dataISO)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  const horas = String(data.getHours()).padStart(2, '0')
  const minutos = String(data.getMinutes()).padStart(2, '0')

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`
}
