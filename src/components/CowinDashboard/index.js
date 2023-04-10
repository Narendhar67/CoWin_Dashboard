// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusValue.initial, CoWinData: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    const data = await response.json()
    const updatedData = x => ({
      last7DaysVaccination: x.last_7_days_vaccination,
      vaccinationByAge: x.vaccination_by_age,
      vaccinationByGender: x.vaccination_by_gender,
    })
    if (response.ok === true) {
      const newData = updatedData(data)
      this.setState({
        CoWinData: newData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationCoverageView = () => {
    const {CoWinData} = this.state
    const {last7DaysVaccination} = CoWinData
    return <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
  }

  renderVaccinationByGenderView = () => {
    const {CoWinData} = this.state
    const {vaccinationByGender} = CoWinData
    return <VaccinationByGender vaccinationByGender={vaccinationByGender} />
  }

  renderVaccinationByAgeView = () => {
    const {CoWinData} = this.state
    const {vaccinationByAge} = CoWinData
    return <VaccinationByAge vaccinationByAge={vaccinationByAge} />
  }

  renderFailureView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-h">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.renderVaccinationCoverageView()}
      {this.renderVaccinationByGenderView()}
      {this.renderVaccinationByAgeView()}
    </>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoaderView()
      case apiStatusValue.success:
        return this.renderSuccessView()
      case apiStatusValue.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="Dashboard-bg">
        <nav className="NavBar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-img"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </nav>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {this.renderFinalView()}
      </div>
    )
  }
}

export default CowinDashboard
