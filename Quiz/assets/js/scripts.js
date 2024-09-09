//ELEMENTS
const progressBar = document.querySelector('#progressBar')
const section = document.querySelector('section')
const nTopics = topics.length
const answears = []

topics.forEach((topics, index) => {

  let options = topics.options

  const divTopic = document.createElement('div')
  divTopic.classList = 'topic'
  index === 0 ? divTopic.classList.add('active') : null

  const divTitle = document.createElement('div')
  divTitle.classList = 'title'
  divTitle.innerHTML = topics.title

  const divOptions = document.createElement('div')
  divOptions.classList = 'options'

  divTopic.appendChild(divTitle)

  options.forEach((option, index) => {
    let optionNumber = index + 1
    let divOption = document.createElement('div')
    divOption.classList = 'option'
    divOption.setAttribute('data-topic-number', topics.order)
    divOption.setAttribute('data-option-number', optionNumber)
    divOption.setAttribute('data-option-correct', topics.answer)
    divOption.innerHTML = `<span>${optionNumber}</span> ${option}`
    divOptions.appendChild(divOption)
  })

  divTopic.appendChild(divOptions)

  section.appendChild(divTopic)

});

//FUNCTIONS
const answerTopic = (element) => {
  let topic = element.getAttribute('data-topic-number')
  let answear = element.getAttribute('data-option-number')
  let rightOption = element.getAttribute('data-option-correct')
  let correct = answear == rightOption ? true : false
  answears.push({ topic, answear, rightOption, correct })
  topic < nTopics ? nextTopic() : showResult()
  moveProgressBar(topic)
}

const nextTopic = () => {
  let topicActive = section.querySelector('.active')
  topicActive.classList.remove('active')
  topicActive.nextElementSibling.classList.add('active')
}

const showResult = () => {

  let totalRight = 0
  let percentRight = 0
  let topicActive = section.querySelector('.active')  
  topicActive.classList.remove('active')

  answears.filter(element => {
    element['correct'] ? totalRight++ : null
  })

  percentRight = totalRight * 100 / nTopics

  const divResult = document.createElement('div')
  divResult.classList = 'result'
  divResult.innerHTML = `Resultado: <br>${percentRight}%`
  divResult.style.display = 'flex'
  
  section.appendChild(divResult)

}

const moveProgressBar = (topic) => {
  let newPercentage = 100 / nTopics * topic
  progressBar.style.backgroundImage = `linear-gradient(to right, #1f951f ${newPercentage}%, transparent 0%)`
}

//EVENTS
document.querySelectorAll('.option').forEach(element => {
  element.addEventListener('click', () => answerTopic(element))
})