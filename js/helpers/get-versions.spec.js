const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const config = require('../../config')
const getVersions = require('./get-versions')

describe('getVersions', () => {

  let sandbox, versions

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'getMaxConcurrentVersions').returns(3)
    sandbox.stub(config, 'getSupportedVersions').returns({AAA: 'AAA', BBB: 'BBB', CCC: 'CCC', DDDD: 'DDD', EEE: 'EEE'})
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns the first supported version where no args are given', () => {
    versions = getVersions()
    expect(versions).to.eql([{AAA: 'AAA'}])
  })

  it('returns the first X supported versions where core versions are requested', () => {
    versions = getVersions('core')
    expect(versions).to.eql([{AAA: 'AAA'}, {BBB: 'BBB'}, {CCC: 'CCC'}])
  })

  it('accepts versions as a string', () => {
    versions = getVersions('DDDD')
    expect(versions).to.eql([{DDDD: 'DDD'}])
  })

  it('accepts versions as a string array', () => {
    versions = getVersions(['DDDD'])
    expect(versions).to.eql([{DDDD: 'DDD'}])
  })

  it('accepts versions as an object array', () => {
    versions = getVersions([{DDDD: 'DDD'}])
    expect(versions).to.eql([{DDDD: 'DDD'}])
  })

  it('falls back to default versions', () => {
    versions = getVersions([], ['BBB']) // string array
    expect(versions).to.eql([{BBB: 'BBB'}])

    versions = getVersions([], [{EEE: 'EEE'}]) // object array
    expect(versions).to.eql([{EEE: 'EEE'}])
  })

  it('filters out unsupported versions from versions and preserves order', () => {
    versions = getVersions(['BBB', 'DDD', 'AAA']) // string array
    expect(versions).to.eql([{BBB: 'BBB'}, {AAA: 'AAA'}])

    versions = getVersions([{BBB: 'BBB'}, {DDDD: 'DDDD'}, {AAA: 'AAA'}]) // object array
    expect(versions).to.eql([{BBB: 'BBB'}, {AAA: 'AAA'}])
  })

  it('filters out unsupported versions from default versions and preserves order', () => {
    versions = getVersions([], ['BBB', 'QQQ', 'AAA']) // string array
    expect(versions).to.eql([{BBB: 'BBB'}, {AAA: 'AAA'}])

    versions = getVersions([], [{BBB: 'BBB'}, {QQQ: 'QQQ'}, {AAA: 'AAA'}]) // object array
    expect(versions).to.eql([{BBB: 'BBB'}, {AAA: 'AAA'}])
  })

  it('throws where versions is neither a string nor string array nor object array', () => {
    expect(() => {
      getVersions(9)
    }).to.throw(TypeError)
  })

  it('throws where default versions is neither a string nor string array nor object array', () => {
    expect(() => {
      getVersions([], [9])
    }).to.throw(TypeError)
  })
})
