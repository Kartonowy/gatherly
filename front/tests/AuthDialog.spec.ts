import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AuthDialog from '../src/components/dialogs/AuthDialog.vue';

vi.mock('@/scripts/api.ts', () => ({
  loginHandler: vi.fn(),
  logout: vi.fn(),
  registerHandler: vi.fn(),
}));

describe('AuthDialog.vue', () => {
  it('should render login tab by default', () => {
    const wrapper = mount(AuthDialog);
    expect(wrapper.find('.form-switch.selected').text()).toBe('Log In');
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should switch to sign-up tab when clicked', async () => {
    const wrapper = mount(AuthDialog);
    await wrapper.findAll('.form-switch')[1].trigger('click');
    expect(wrapper.find('.form-switch.selected').text()).toBe('Sign Up');
  });

  it('should call loginHandler on login form submit', async () => {
    const { loginHandler } = await import('../src/scripts/api.ts');
    const wrapper = mount(AuthDialog);
    await wrapper.find('form').trigger('submit.prevent');
    expect(loginHandler).toHaveBeenCalled();
  });

  it('should call registerHandler on register form submit', async () => {
    const { registerHandler } = await import('../src/scripts/api.ts');
    const wrapper = mount(AuthDialog);
    await wrapper.findAll('.form-switch')[1].trigger('click'); // Switch to Sign Up
    await wrapper.find('form').trigger('submit.prevent');
    expect(registerHandler).toHaveBeenCalled();
  });

  it('should call logout on clicking logout button', async () => {
    const { logout } = await import('../src/scripts/api.ts');
    const wrapper = mount(AuthDialog);
    await wrapper.find('button').trigger('click');
    expect(logout).toHaveBeenCalled();
  });

  it('should validate required fields in sign-up form', async () => {
    const wrapper = mount(AuthDialog);
    await wrapper.findAll('.form-switch')[1].trigger('click'); // Switch to Sign Up
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    expect(wrapper.text()).toContain('required'); // Assuming validation messages are displayed
  });
});
