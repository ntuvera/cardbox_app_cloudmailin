class Contact < ActiveRecord::Base
  validates_presence_of :name
  validates :email, uniqueness: true
  has_many :cards
  belongs_to :user


  def find_on_linkedin
    names = self.name.split(' ')
    name1 = names[0]
    name2 = names[1]
    agent = Mechanize.new
    page = agent.get("http://www.linkedin.com/pub/dir/#{name1}/#{name2}")
    results = []
    li_list = page.search('li.vcard')
    h2_list = li_list.search('h2')
    search
    
  end
end
