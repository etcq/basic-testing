import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timeout = 1000;
    const fakeFn = jest.fn();
    doStuffByTimeout(fakeFn, timeout);
    expect(setTimeout).toHaveBeenCalledWith(fakeFn, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timeout = 1000;
    const fakeFn = jest.fn();
    doStuffByTimeout(fakeFn, timeout);
    expect(fakeFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(fakeFn).toHaveBeenCalled();
    expect(fakeFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const timeout = 1000;
    const fakeFn = jest.fn();
    doStuffByInterval(fakeFn, timeout);
    expect(setInterval).toHaveBeenCalledWith(fakeFn, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const timeout = 1000;
    const repeatCount = 10;
    const fakeFn = jest.fn();
    doStuffByInterval(fakeFn, timeout);
    expect(fakeFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout * repeatCount);
    expect(fakeFn).toHaveBeenCalledTimes(repeatCount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously('filePath');
    expect(spy).toHaveBeenCalledWith(expect.any(String), 'filePath');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const file = await readFileAsynchronously('filePath');
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(path, 'join').mockReturnValue('mocked/path/file');
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('fileContent'));
    const file = await readFileAsynchronously('filePath');
    expect(file).toBe('fileContent');
  });
});
