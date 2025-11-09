import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    expect(account.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const withdrawAmount = 120;
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const transferAmount = 120;
    const accountForGettingAmount = getBankAccount(10);
    expect(() =>
      account.transfer(transferAmount, accountForGettingAmount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const transferAmount = 80;
    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const depositValue = 10;
    account.deposit(depositValue);
    expect(account.getBalance()).toBe(initBalance + depositValue);
  });

  test('should withdraw money', () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const withdrawAmount = 10;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initBalance = 100;
    const accountForGettingBalance = 20;
    const transferValue = 10;
    const account = getBankAccount(initBalance);
    const accountForGettingAmount = getBankAccount(accountForGettingBalance);
    account.transfer(transferValue, accountForGettingAmount);
    expect(account.getBalance()).toBe(initBalance - transferValue);
    expect(accountForGettingAmount.getBalance()).toBe(
      accountForGettingBalance + transferValue,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    expect(account.fetchBalance()).resolves.not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const spy = jest.spyOn(account, 'fetchBalance').mockResolvedValue(10);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(10);
    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initBalance = 100;
    const account = getBankAccount(initBalance);
    const spy = jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    spy.mockRestore();
  });
});
