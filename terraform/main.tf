provider "aws" {
  region = var.aws_region
}

module "database" {
  source = "./modules/database"
  instance_class = "db.t3.large"
  multi_az = true
  storage_type = "gp3"
}

module "cache" {
  source = "./modules/cache"
  node_type = "cache.t3.medium"
  num_cache_nodes = 2
}

module "compute" {
  source = "./modules/compute"
  desired_capacity = 3
  instance_type = "t3.medium"
}
