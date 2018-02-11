const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const config = require('../../config')
const getVersions = require('./get-versions')
const v = require('../../versions-mock')

const STR_NOT_A_VERSION = 'DDD'
const OBJ_NOT_A_VERSION = {
  name: 'Mock Version D',
  abbr: 'DDD',
  code: 'XDX'
}

describe('getVersions', () => {

  let sandbox, versions

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'getMaxConcurrentVersions').returns(3)
    sandbox.stub(config, 'getSupportedVersions').returns(v)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns the first supported version where no args are given', () => {
    versions = getVersions()
    expect(versions).to.eql([v[0]])
  })

  it('returns the first X supported versions where core versions are requested', () => {
    versions = getVersions('core')
    expect(versions).to.eql([v[0], v[1], v[2]])
  })

  it('accepts versions as a string', () => {
    versions = getVersions('DDDD')
    expect(versions).to.eql([v[3]])
  })

  it('accepts versions as a string array', () => {
    versions = getVersions(['DDDD'])
    expect(versions).to.eql([v[3]])
  })

  it('accepts versions as an object array', () => {
    versions = getVersions([v[3]])
    expect(versions).to.eql([v[3]])
  })

  it('falls back to default versions', () => {
    versions = getVersions([], ['BBB']) // string array
    expect(versions).to.eql([v[1]])

    versions = getVersions([], [v[4]]) // object array
    expect(versions).to.eql([v[4]])
  })

  it('filters out unsupported versions from versions and preserves order', () => {
    versions = getVersions(['BBB', STR_NOT_A_VERSION, 'AAA']) // string array
    expect(versions).to.eql([v[1], v[0]])

    versions = getVersions([v[1], OBJ_NOT_A_VERSION, v[0]]) // object array
    expect(versions).to.eql([v[1], v[0]])
  })

  it('filters out unsupported versions from default versions and preserves order', () => {
    versions = getVersions([], ['DDDD', STR_NOT_A_VERSION, 'AAA']) // string array
    expect(versions).to.eql([v[3], v[0]])

    versions = getVersions([], [v[3], OBJ_NOT_A_VERSION, v[0]]) // object array
    expect(versions).to.eql([v[3], v[0]])
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
