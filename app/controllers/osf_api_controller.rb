class OsfAPIController < OsfAuthController
  require 'fileutils'
  require 'vtech_data/zip_file_generator'
  require 'vtech_data/osf_import_tools'

  helper_method :detail_route
  before_action :check_logged_in, only: [:list, :detail]
  before_action :get_oauth_token

  def list
    osf_import_tools = OsfImportTools.new(@oauth_token)
    @projects = osf_import_tools.get_user_projects
  end

  def detail
    osf_import_tools = OsfImportTools.new(@oauth_token)
    @project = osf_import_tools.get_project_details(node_url_from_id(params["project_id"]))
  end

  def import
    raise params["project_id"].inspect
  end


  def detail_route project_id
    "/osf_api/detail/#{project_id}"
  end

  def get_oauth_token
    @oauth_token = oauth_token
  end

  def node_url_from_id node_id
    File.join(Rails.application.config.osf_api_base_url, "nodes", node_id, "/")  
  end

  def check_logged_in
    redirect_to oauth_auth_url unless session['oauth_token']
  end

end
