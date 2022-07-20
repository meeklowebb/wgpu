// Copyright 2022 Michelangelo Webb. All rights reserved.

import { describe, it, expect } from 'vitest'
import { setHex} from '../../src/utils'

describe("RGB to HEX colors", () => {
    it("Simple test", async () => {
        expect(true).toBe(true)
    })
    it("testing setHex", async () => {
        expect('0c').toBe(setHex(12))
    })
})