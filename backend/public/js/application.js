// console.log('JS work');

// const signupForm = document.querySelector('#signup')

// if (signupForm) {
// signupForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(signupForm)
//   const parseData = Object.fromEntries(formData)
//   let response = await fetch(`http://localhost:3000/users/signup`, {
//     method: 'POST',
//     credentials: 'include', 
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(parseData)
//   })
//   let data = await response.json()

//   if (response.status === 200) {
//   location.assign('http://localhost:3000/users/signin')
//   } else if (response.status === 401) {
//     location.assign('http://localhost:3000/users/unauthorized')
//   }
// })
// }




