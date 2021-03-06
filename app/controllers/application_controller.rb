class ApplicationController < ActionController::Base
  include Styx::Initializer

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  add_flash_types :error, :failure, :success, :alert

  before_action :redirect_to_main_domain, if: -> { request.host != 'www.it52.info' && Rails.env.production? }
  before_action :authenticate_user!, if: -> { authenticated_path? }

  rescue_from CanCan::AccessDenied do |exception|
    path = request.referer =~ /#{Figaro.env.mailing_host}/ ? :back : '/'
    redirect_to path, flash: { error: exception.message }
  end

  def after_sign_in_path_for(resource)
     request.env['omniauth.origin'] ||
     stored_location_for(resource) ||
     root_path
  end

  protected

  def redirect_to_main_domain
    redirect_to "http://www.#{Figaro.env.mailing_host}#{request.fullpath}", status: :moved_permanently
  end

  private

  def authenticated_path?
    controller_namespace == My || new_event_path == request.original_fullpath
  end

  def controller_namespace
    self.class.parent
  end
end
