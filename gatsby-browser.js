import './src/styles/global.scss'
import './src/styles/scss/style.scss'
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This tutorial has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}