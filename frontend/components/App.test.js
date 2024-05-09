import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AppFunctional from './AppFunctional'

// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })

describe( 'AppFunctional Testing', () => {
  let user, left, up, right, down, reset, submit
  beforeEach(() => {
    render (<AppFunctional />)
    user = userEvent.setup()
    left = screen.getByText('LEFT')
    up = screen.getByText('UP')
    right = screen.getByText('DOWN')
    down = screen.getByText('DOWN')
    reset = screen.getByText('reset')
    submit = screen.getByText('Submit')
  })

  test('1 - Coordinates are correct', async () => {
    await user.click(left)
    await user.click(down)
    await user.click(right)
    expect(await screen.findByText('Coordinates (2, 3)')).toBeVisible()
    expect(await screen.findByText('You moved 3 times')).toBeVisible()

  })

  test('2 - reset works correctly', async () => {
    await user.click(up)
    await user.click(right)
    await user.click(down)
    await user.click(reset)
    expect(await screen.findByText('Coordinates (2, 2)')).toBeVisible()
    expect(await screen.findByText('You moved 0 times')).toBeVisible()

  })

  test('3 - submit works properly', async () => {

  })




}




)