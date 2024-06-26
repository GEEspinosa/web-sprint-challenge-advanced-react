import React from 'react'
import axios from 'axios'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AppFunctional from './AppFunctional'

jest.setTimeout(1000) // default 5000 too long for Codegrade
jest.mock('axios')

describe( 'AppFunctional Testing', () => {
  
  let user, left, up, right, down, reset; 
  let submit, emailInput
  let steps


  beforeEach(() => {
    axios.post.mockResolvedValue({
      data: {
        message: 'foo@bar.baz failure #23'
      }
    });

    render (<AppFunctional />)
    user = userEvent.setup()
    left = screen.getByText('LEFT')
    up = screen.getByText('UP')
    right = screen.getByText('RIGHT')
    down = screen.getByText('DOWN')
    reset = screen.getByText('reset')
    submit = screen.getByText('Submit')
    emailInput = screen.getByPlaceholderText('type email')
    steps = screen.getByTestId('steps')
  })

  test('1 - Coordinates are correct', async () => {
    await user.click(left)
    await user.click(down)
    await user.click(right)
    expect(await screen.findByText('Coordinates (2, 3)')).toBeVisible()
    expect(await screen.findByText('You moved 3 times')).toBeVisible()
    expect(steps).toHaveTextContent('You moved 3 times')

  })

  test('2 - reset works correctly', async () => {
    await user.click(up)
    await user.click(right)
    await user.click(down)
    await user.click(reset)
    expect(await screen.findByText('Coordinates (2, 2)')).toBeVisible()
    expect(await screen.findByText('You moved 0 times')).toBeVisible()
  })



  // test('3 - submit empty email', async () =>{
  //   await user.click(submit)
  //   expect (await screen.findByText('Ouch: email is required')).toBeVisible()
  // })

  test('4 - submit foo@bar.baz email', async() => {
    await user.type(emailInput, 'foo@bar.baz')
    await user.click(submit)
    expect(await screen.findByText('foo@bar.baz failure #23')).toBeVisible()
  })

    // test('5 - submit foo@bar.baz email', async() => {
  //   await user.type(emailInput, 'foo@bar.baz')
  //   await user.click(submit)
  //   expect(await screen.findByText('foo@bar.baz failure #23')).toBeVisible()
  // })

  test('5 - testing the tester fucker', async () => {
    await user.click(right)
    await user.click(up)
    await user.click(left)
    await user.click(left)
    expect(await screen.findByText('Coordinates (1, 1)')).toBeVisible()
    expect(await screen.findByText('You moved 4 times')).toBeVisible()
    expect(steps).toHaveTextContent('You moved 4 times')
  })
}
)